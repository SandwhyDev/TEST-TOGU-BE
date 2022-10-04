import { PrismaClient } from "@prisma/client";

const employeeAddressModel = new PrismaClient().employeeAddress;

export default employeeAddressModel;
