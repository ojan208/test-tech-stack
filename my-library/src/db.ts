import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient;
}

const prisma: PrismaClient = global.prisma || new PrismaClient();

if (!global.prisma) {
    global.prisma = new PrismaClient();
}
// if (process.env.NODE_ENV !== "production") {
// }

export default prisma;