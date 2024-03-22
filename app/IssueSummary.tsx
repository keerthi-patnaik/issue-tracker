import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

type IssueSummeryProps = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueSummary = ({ open, inProgress, closed }: IssueSummeryProps) => {
  const CardContents: { name: string; value: number; queryParam: Status }[] = [
    { name: "Open Issue", value: open, queryParam: "OPEN" },
    {
      name: "In-progress Issue",
      value: inProgress,
      queryParam: "INPROGRESS",
    },
    { name: "Closed Issue", value: closed, queryParam: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {CardContents.map((content, index) => {
        return (
          <Card size="1" style={{ width: 350 }} variant="classic" key={index}>
            <Flex direction="column" gap="3">
              <Link
                className="text-sm"
                href={`/issues/list?${content.queryParam}`}
              >
                {content.name}
              </Link>
              <Text size="5" weight="bold">
                {content.value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
