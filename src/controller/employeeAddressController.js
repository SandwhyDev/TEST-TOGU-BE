import express from "express";
import { validateEmployeeAddressDetails } from "../libs/joi_validation";
import employeeAddressModel from "../model/employeeAddressModel";
import employeeModel from "../model/employeeModel";

const employeeAddressController = express.Router();

//CREATE
employeeAddressController.post("/employeeAddress/create", async (req, res) => {
  try {
    const data = await req.body;
    const cekValidation = await validateEmployeeAddressDetails(req.body);

    const findId = await employeeModel.findUnique({
      where: {
        id: parseInt(data.employee_id),
      },
      include: {
        employeeaddress: true,
      },
    });

    if (!findId) {
      res.status(404).json({
        success: false,
        msg: "data tidak di temukan",
      });
      return;
    }

    if (findId.employeeaddress != null) {
      res.status(401).json({
        success: false,
        msg: "employee sudah punya address",
      });
      return;
    }

    const createEmployee = await employeeAddressModel.create({
      data: {
        employee_id: parseInt(data.employee_id),
        address_name: data.address_name,
        address: data.address,
        city: data.city,
        province: data.province,
        zip_code: parseInt(data.zip_code),
      },
    });

    res.status(201).json({
      success: true,
      msg: "succes add employee address",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//READ
employeeAddressController.post("/employeeAddress/read", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = await req.query;
    const skip = (page - 1) * limit;
    const cn = await employeeAddressModel.count();
    const { filter } = await req.body;
    const readEmployee = await employeeAddressModel.findMany({
      where: filter,
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    res.status(200).json({
      current_page: parseInt(page),
      total_page: Math.ceil(cn / limit),
      total_data: cn,
      total_data_tampilan: readEmployee.length,
      query: readEmployee,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//UPDATE
employeeAddressController.put("/employeeAddress/update/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const data = await req.body;
    const cekValidation = await validateEmployeeAddressDetails(req.body);
    const findId = await employeeAddressModel.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!findId) {
      res.status(404).json({
        success: false,
        msg: "data tidak di temukan",
      });
      return;
    }

    const updateEmployee = await employeeAddressModel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        address_name: data.address_name,
        address: data.address,
        city: data.city,
        province: data.province,
        zip_code: data.zip_code,
      },
    });

    res.status(201).json({
      success: true,
      msg: "success update employee",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE
employeeAddressController.delete("/employeeAddress/delete/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const findId = await employeeAddressModel.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!findId) {
      res.status(404).json({
        success: false,
        msg: "data tidak di temukan",
      });
      return;
    }
    const deleteEmployee = await employeeAddressModel.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(201).json({
      success: true,
      msg: "success delete employee",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default employeeAddressController;
