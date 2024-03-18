import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
      <Skeleton width="8rem" height="1.5rem" className="my-3" />
    </Box>
  );
};

export default IssueFormSkeleton;
