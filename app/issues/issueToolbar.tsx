import { ButtonLink } from "@/app/components";

const IssueToolbar = () => {
  return (
    <div className="mb-5 flex">
      <ButtonLink href="/issues/new">New Issues</ButtonLink>
    </div>
  );
};

export default IssueToolbar;
