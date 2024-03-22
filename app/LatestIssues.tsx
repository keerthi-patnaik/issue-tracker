import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card variant="classic">
      <Heading size="4" mb="4">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body className="divide-y">
          {latestIssues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell className="shadow-none">
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link
                        href={`issues/${issue.id}`}
                        className="text-sm font-medium"
                      >
                        {issue.title}
                      </Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUserId && (
                      <Avatar
                        size="2"
                        radius="full"
                        fallback="?"
                        referrerPolicy="no-referrer"
                        color="gray"
                        highContrast
                        src={issue.assignedToUser?.image!}
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
