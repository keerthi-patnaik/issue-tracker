import { ButtonLink, IssueStatusBadge } from "@/app/components";
import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import Markdown from "react-markdown";

type IssueDetailsPageProps = {
  params: { id: string };
};

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  if (!isNumber(params.id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Box className="space-y-3">
        <Heading>{issue.title}</Heading>
        <Flex className="gap-3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toLocaleDateString()}</Text>
        </Flex>
        <Card>
          <Markdown className="prose">{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <ButtonLink href={`/issues/${issue.id}/edit`} className="w-32 gap-2">
          <>
            <FaRegEdit />
            <span>Edit Issue</span>
          </>
        </ButtonLink>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
