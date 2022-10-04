import { PrismaClient } from "@prisma/client";

const employeeModel = new PrismaClient().employee;

export default employeeModel;
