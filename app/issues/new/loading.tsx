import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton />
      <Skeleton height="20rem" />
      <Skeleton width="10rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
