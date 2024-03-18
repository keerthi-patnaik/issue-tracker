import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
