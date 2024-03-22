import { Pagination } from "@/app/components";
import { statuses } from "@/lib/ValidationSchema";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import IssueToolbar from "../_components/IssueToolbar";
import IssueTable, { columnNames } from "./IssueTable";

export const allowedSortOrder = ["asc", "desc"] as const;

type IssuePageProps = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortOrder: (typeof allowedSortOrder)[number];
    page: string;
  };
};

const allowedOrderBy = columnNames;

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

  return (
    <Flex direction="column" gap="3">
      <IssueToolbar queryStatus={searchParams.status} />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="end">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={IssueCount}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;
