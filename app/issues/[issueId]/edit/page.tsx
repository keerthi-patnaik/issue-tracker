import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

type EditIssuePageProps = {
  params: { issueId: string };
};

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  if (!isNumber(params.issueId)) notFound;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.issueId) },
  });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
