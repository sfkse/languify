import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function createUser(user: User) {
  const newUser = await prisma.user.create({
    data: user,
  });
  return newUser;
}

