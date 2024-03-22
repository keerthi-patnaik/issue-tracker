"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

type PaginationProps = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        {currentPage} Page {pageCount}
      </Text>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => {
          changePage(1);
        }}
      >
        <FaAnglesLeft />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => {
          changePage(currentPage - 1);
        }}
      >
        <FaAngleLeft />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        <FaAngleRight />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => {
          changePage(pageCount);
        }}
      >
        <FaAnglesRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
