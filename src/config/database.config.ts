import { PrismaClient } from "@prisma/client";
import { softDeleteMiddleware } from "src/middlewares/soft-delete.middleware";

const db = new PrismaClient()

softDeleteMiddleware(db)

export { db }