import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";

type IssueDetailsPageProps = {
  params: { issueId: string };
};

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  if (!isNumber(params.issueId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.issueId) },
  });

  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Box className="space-y-3">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <IssueEditButton href={`/issues/${issue.id}/edit`} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
