import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.quizResult.create({
      data: {
        score: body.score,
        result: body.result,
        quizSlug: body.quizSlug || "test1",
        answers: body.answers || {},
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 },
    );
  }
}
