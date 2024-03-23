import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

type IssueDetailsProps = {
  issue: Issue;
};

const IssueDetails = ({ issue }: IssueDetailsProps) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="gap-3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card variant="classic">
        <Markdown className="prose max-w-full">{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
