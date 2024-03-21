"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

type IssueStatusFilterProps = {
  queryStatus: string;
};

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "INPROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = ({ queryStatus }: IssueStatusFilterProps) => {
  const router = useRouter();

  const onSelectStatus = (status: string) => {
    let query = "";
    if (status && status !== "All") {
      query = `?status=${status}`;
    }

    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root onValueChange={onSelectStatus} defaultValue={queryStatus}>
      <Select.Trigger placeholder="Filter by status.." className="md:w-36" />
      <Select.Content position="popper">
        {statuses.map((status) => {
          return (
            <Select.Item key={status.label} value={status.value || "All"}>
              {status.label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
