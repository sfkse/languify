import { prisma } from "@/app/(protected)/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        clerkId: params.userId,
      },
    });

    if (!user) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
