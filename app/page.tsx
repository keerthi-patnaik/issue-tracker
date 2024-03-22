import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <LatestIssues />
      <Flex direction="column" gap="3">
        <IssueSummary
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
        <IssueChart
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Summary of issues",
};
