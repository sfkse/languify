"use server";

import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
export async function createDocument(
  title: string,
  url: string,
  userId: string
) {
  const response = await prisma.document.create({
    data: {
      id: uuidv4(),
      title,
      url,
      userId,
    },
  });

  return response;
}

export async function getDocument(id: string) {
  try {
    const document = await prisma.document.findMany({
      where: {
        id,
      },
    });
    return document;
  } catch (error) {
    console.error(error);
    return null;
  }
}

