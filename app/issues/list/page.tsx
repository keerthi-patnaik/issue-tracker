import { CustomLink, IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import IssueToolbar from "../_components/IssueToolbar";

const columnNames: { label: string; value: keyof Issue; className?: string }[] =
  [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

type IssuePageProps = {
  searchParams: { status: Status };
};

const IssuePage = async ({ searchParams }: IssuePageProps) => {
  const issues = await prisma.issue.findMany({
    where: { status: searchParams.status },
  });

  http: return (
    <div>
      <IssueToolbar queryStatus={searchParams.status} />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columnNames.map((column) => {
              return (
                <Table.ColumnHeaderCell
                  key={column.label}
                  className={column.className}
                >
                  <Link
                    href={{
                      pathname: "/issues/list",
                      query: {
                        status: searchParams.status,
                        orderBy: column.value,
                      },
                    }}
                  >
                    {column.label}
                  </Link>
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <CustomLink href={`/issues/${issue.id}`}>
                    <Text>{issue.title}</Text>
                  </CustomLink>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;
