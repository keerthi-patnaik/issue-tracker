import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

type EditIssuePageProps = {
  params: { id: string };
};

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  if (!isNumber(params.id)) notFound;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
