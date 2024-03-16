import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Link
          className="h-4 w-4 rounded-md bg-[#12a594] px-2 py-2 text-sm font-medium text-white hover:bg-[#0c9b8a]"
          href="/issues/new"
        >
          New Issues
        </Link>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  {issue.title}
                  <div className="block md:hidden">{issue.status}</div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.status}
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

export default IssuePage;
