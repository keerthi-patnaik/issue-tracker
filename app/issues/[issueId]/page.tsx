import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDeleteButton from "./IssueDeleteButton";
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
    <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
      <Box className="space-y-3 md:col-span-4 ">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction={"column"} gap="4">
          <IssueEditButton href={`/issues/${issue.id}/edit`} />
          <IssueDeleteButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
