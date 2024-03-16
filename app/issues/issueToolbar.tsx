import Link from "next/link";

const IssueToolbar = () => {
  return (
    <div className="mb-5">
      <Link
        className="h-4 w-4 rounded-md bg-[#12a594] px-2 py-2 text-sm font-medium text-white hover:bg-[#0c9b8a]"
        href="/issues/new"
      >
        New Issues
      </Link>
    </div>
  );
};

export default IssueToolbar;
