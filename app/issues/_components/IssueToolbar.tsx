import { ButtonLink } from "@/app/components";
import { Button, Flex, Link } from "@radix-ui/themes";
import IssueStatusFilter from "../list/IssueStatusFilter";

type IssueToolbarProps = {
  queryStatus: string;
};

const IssueToolbar = ({ queryStatus }: IssueToolbarProps) => {
  return (
    <Flex justify="between" mb="3">
      <Flex gap="2">
        <IssueStatusFilter queryStatus={queryStatus} />
        <Button variant="soft" color="gray">
          <Link href="/issues/list"> clear Filter</Link>
        </Button>
      </Flex>

      <ButtonLink href="/issues/new">New Issues</ButtonLink>
    </Flex>
  );
};

export default IssueToolbar;
