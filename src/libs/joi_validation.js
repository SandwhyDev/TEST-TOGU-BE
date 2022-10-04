const Joi = require("joi");

const employeeCheck = Joi.object({
  firstname: Joi.string().min(3).max(25).required(),
  lastname: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().trim().required(),
  position: Joi.string().required(),
  phone: Joi.string()
    .min(10)
    .max(12)
    .pattern(/^[0-9]+$/),
});

export const validateEmployeeDetails = async (object) => {
  try {
    const value = await employeeCheck.validateAsync(object);
  } catch (error) {
    throw new Error(error);
  }
};

// EMPLOYEE ADDRESS VALIDATION
const employeeAddressCheck = Joi.object({
  employee_id: Joi.number().integer().options({ convert: false }),
  address_name: Joi.string().min(3).max(20).required().messages({
    "string.max": "address name Maximax 20 characters",
  }),
  address: Joi.string().min(3).max(255).required(),
  city: Joi.string().min(3).max(100).required(),
  province: Joi.string().min(3).max(100).required(),
  zip_code: Joi.string()
    .min(5)
    .pattern(/^[0-9]+$/)
    .messages({ "string.pattern.base": `zip code harus angka.` })

    .required(),
});

export const validateEmployeeAddressDetails = async (object) => {
  try {
    const value = await employeeAddressCheck.validateAsync(object);
  } catch (error) {
    throw new Error(error);
  }
};
// EMPLOYEE ADDRESS VALIDATION END
