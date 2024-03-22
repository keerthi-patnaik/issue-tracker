import { CustomLink, IssueStatusBadge, Pagination } from "@/app/components";
import { statuses } from "@/lib/ValidationSchema";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import IssueToolbar from "../_components/IssueToolbar";

const columnNames: { label: string; value: keyof Issue; className?: string }[] =
  [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

const allowedOrderBy = columnNames.map((column) => {
  return column.value;
});

const allowedSortOrder = ["asc", "desc"] as const;

type IssuePageProps = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortOrder: (typeof allowedSortOrder)[number];
    page: string;
  };
};

const IssuePage = async ({ searchParams }: IssuePageProps) => {
  if (searchParams.status && !statuses.includes(searchParams.status)) {
    redirect("/issues/list");
  }

  if (searchParams.orderBy && !allowedOrderBy.includes(searchParams.orderBy)) {
    redirect("/issues/list");
  }

  if (
    searchParams.sortOrder &&
    !allowedSortOrder.includes(searchParams.sortOrder)
  ) {
    redirect("/issues/list");
  }

  const status = searchParams.status ? searchParams.status : undefined;

  const orderBy = searchParams.orderBy
    ? { [searchParams.orderBy]: searchParams.sortOrder }
    : undefined;

  const toggleOrder = () => {
    if (!searchParams.sortOrder) {
      return "asc";
    }

    if (searchParams.sortOrder === "asc") {
      return "desc";
    }

    return undefined;
  };

  const page = parseInt(searchParams.page) || 1;

  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const IssueCount = await prisma.issue.count({
    where: { status: status },
  });

  let sortOrderComp: React.ReactNode = null;
  if (searchParams.sortOrder === "asc") {
    sortOrderComp = <HiArrowNarrowUp className="inline" />;
  }
  if (searchParams.sortOrder === "desc") {
    sortOrderComp = <HiArrowNarrowDown className="inline" />;
  }

  return (
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={IssueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;
