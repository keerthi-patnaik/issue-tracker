import { CustomLink, IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { allowedSortOrder } from "./page";

type IssueTableProps = {
  issues: Issue[];
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortOrder: (typeof allowedSortOrder)[number];
    page: string;
  };
};

const column: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = column.map((columnName) => {
  return columnName.value;
});

const IssueTable = ({ searchParams, issues }: IssueTableProps) => {
  let sortOrderComp: React.ReactNode = null;

  if (searchParams.sortOrder === "asc") {
    sortOrderComp = <HiArrowNarrowUp className="inline" />;
  }
  if (searchParams.sortOrder === "desc") {
    sortOrderComp = <HiArrowNarrowDown className="inline" />;
  }

  const toggleOrder = () => {
    if (!searchParams.sortOrder) {
      return "asc";
    }

    if (searchParams.sortOrder === "asc") {
      return "desc";
    }

    return undefined;
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {column.map((column) => {
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
                      sortOrder: toggleOrder(),
                    },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && sortOrderComp}
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
  );
};

export default IssueTable;
