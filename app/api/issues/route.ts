import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/lib/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// api: [POST] /api/issues
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(null, { status: 401 });
  }

  // Request body
  const body = await request.json();

  // Check if the body is in correct format
  const validation = issueSchema.safeParse(body);
  // if body is not correct return 400 error
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // create new issue
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      status: body.status,
      description: body.description,
    },
  });

  // return new issue with 201 success
  return NextResponse.json(newIssue, { status: 201 });
}
