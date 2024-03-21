import { ButtonLink } from "@/app/components";
import { Flex } from "@radix-ui/themes";
import IssueStatusFilter from "../list/IssueStatusFilter";

type IssueToolbarProps = {
  queryStatus: string;
};

const IssueToolbar = ({ queryStatus }: IssueToolbarProps) => {
  return (
    <Flex justify="between" mb="3">
      <IssueStatusFilter queryStatus={queryStatus} />
      <ButtonLink href="/issues/new">New Issues</ButtonLink>
    </Flex>
  );
};

export default IssueToolbar;
