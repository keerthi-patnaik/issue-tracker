import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/lib/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type IssueProps = {
  params: { issueId: string };
};

// api: [PATCH] /api/issues/[issueId]
export async function PATCH(request: NextRequest, { params }: IssueProps) {
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

  // check if id is already in the db
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.issueId) },
  });
  if (!issue) {
    // if id is not in db then return 404 error
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // update issue
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.issueId) },
    data: {
      title: body.title,
      status: body.status,
      description: body.description,
    },
  });

  // return updated issue with 200 success
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: IssueProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(null, { status: 401 });
  }

  // check if id is already in the db
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.issueId) },
  });
  if (!issue) {
    // if id is not in db then return 404 error
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: parseInt(params.issueId) },
  });

  return new Response(null, { status: 204 });
}
