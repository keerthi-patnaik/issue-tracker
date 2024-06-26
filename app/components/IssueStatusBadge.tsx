import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

type IssueStatusBadgeProps = {
  status: Status;
};

const statusMap: Record<
  Status,
  { label: string; color: "green" | "blue" | "red" }
> = {
  OPEN: { label: "Open", color: "red" },
  INPROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => {
  return (
    <Badge variant="soft" color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
