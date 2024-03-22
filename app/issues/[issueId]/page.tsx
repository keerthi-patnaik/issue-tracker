import authOptions from "@/app/auth/authOptions";
import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";

type IssueDetailsPageProps = {
  params: { issueId: string };
};

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  const session = await getServerSession(authOptions);

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

      {session && (
        <Box>
          <Flex direction={"column"} gap="4">
            <AssigneeSelect issue={issue} />
            <IssueEditButton href={`/issues/edit/${issue.id}`} />
            <IssueDeleteButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: IssueDetailsPageProps) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.issueId) },
  });

  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}

export default IssueDetailsPage;
