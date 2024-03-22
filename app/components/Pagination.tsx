"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
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
        onClick={() => {}}
      >
        <FaAnglesLeft />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => {}}
      >
        <FaAngleLeft />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => {}}
      >
        <FaAngleRight />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => {}}
      >
        <FaAnglesRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
