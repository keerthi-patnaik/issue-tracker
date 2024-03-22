import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const openCount = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgressCount = await prisma.issue.count({
    where: {
      status: "INPROGRESS",
    },
  });
  const closedCount = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  return (
    <>
      <IssueChart
        open={openCount}
        inProgress={inProgressCount}
        closed={closedCount}
      />
    </>
  );
}
