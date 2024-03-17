import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { isNumber } from "@/lib";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
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
  );
};

export default IssueDetailsPage;
