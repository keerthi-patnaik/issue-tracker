"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const onSelectStatus = (status: string) => {
    const params = new URLSearchParams();

    if (status && status !== "All") {
      params.append("status", status);
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }
    if (searchParams.get("sortOrder")) {
      params.append("sortOrder", searchParams.get("sortOrder")!);
    }

    const query = params.size ? "?" + params.toString() : "";

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
