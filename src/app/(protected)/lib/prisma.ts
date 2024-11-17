import { PrismaClient } from "@prisma/client";

/** DEFAULT PRISMA CLIENT */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** FIXED PRISMA CLIENT */
// import { PrismaClient } from "@prisma/client";

// declare global {
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient;
//     }
//   }
// }

// export let prisma: PrismaClient;

// if (typeof window === "undefined") {
//   if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
//   } else {
//     if (!(global as any).prisma) {
//       (global as any).prisma = new PrismaClient();
//     }

//     prisma = (global as any).prisma;
//   }
// }

