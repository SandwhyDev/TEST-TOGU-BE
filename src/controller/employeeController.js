import express from "express";
import validation, { validateEmployeeDetails } from "../libs/joi_validation";
import employeeModel from "../model/employeeModel";

const employeeController = express.Router();

//CREATE
employeeController.post("/employee/create", async (req, res) => {
  try {
    const data = await req.body;
    const validationData = await validation(req.body);

    const findEmail = await employeeModel.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findEmail) {
      res.status(401).json({
        success: false,
        msg: "email sudah di gunakan",
      });
      return;
    }

    const createEmployee = await employeeModel.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        position: data.position,
      },
    });

    res.status(201).json({
      success: true,
      msg: "succes add employee",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//READ
employeeController.post("/employee/read", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = await req.query;
    const skip = (page - 1) * limit;
    const cn = await employeeModel.count();
    const { filter } = await req.body;
    const readEmployee = await employeeModel.findMany({
      where: filter,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        employeeaddress: {
          select: {
            address: true,
            address_name: true,
            city: true,
            province: true,
            zip_code: true,
          },
        },
      },
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
employeeController.put("/employee/update/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const data = await req.body;
    const validationData = await validateEmployeeDetails(req.body);

    const findId = await employeeModel.findUnique({
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

    const updateEmployee = await employeeModel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        position: data.position,
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
employeeController.delete("/employee/delete/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const findId = await employeeModel.findUnique({
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
    const deleteEmployee = await employeeModel.delete({
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

export default employeeController;
