import Link from "next/link";

const IssuePage = () => {
  return (
    <div>
      <Link
        className="h-4 w-4 rounded-md bg-slate-500 px-2 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
        href="/issues/new"
      >
        New Issues
      </Link>
    </div>
  );
};

export default IssuePage;
