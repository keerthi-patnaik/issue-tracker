import { ButtonLink } from "@/app/components";
import { FaRegEdit } from "react-icons/fa";

type IssueEditButtonProps = {
  href: string;
};

const IssueEditButton = ({ href }: IssueEditButtonProps) => {
  return (
    <ButtonLink href={href} className="w-32 gap-2">
      <>
        <FaRegEdit />
        <span>Edit Issue</span>
      </>
    </ButtonLink>
  );
};

export default IssueEditButton;
