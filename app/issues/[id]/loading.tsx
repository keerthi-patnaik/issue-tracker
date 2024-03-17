import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailPageLoading = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton />
      <Flex className="gap-3">
        <Skeleton width="3rem" />
        <Skeleton width="4rem" />
      </Flex>
      <Card>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailPageLoading;
