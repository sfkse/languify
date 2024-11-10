import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/(protected)/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, url } = body;

    // TODO: Get actual user ID from session
    const userId = "7aeee421-37b2-4972-b135-d9697396ad5f"; // Replace with actual auth logic
    console.log(userId, title, url);
    const document = await prisma.document.create({
      data: {
        title,
        url,
        userId,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Failed to create document:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}

