"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IssueDeleteButtonProps = {
  issueId: number;
};

const IssueDeleteButton = ({ issueId }: IssueDeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setSubmitting(true);
    setError("");
    try {
      await axios.delete(`/api/issues/${issueId}`);

      router.push("/issues");
      router.refresh();
      setOpen(false);
    } catch (error) {
      setSubmitting(false);
      setError("Sorry! This issue could not deleted. ");
    }
  };

  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger onClick={() => setOpen(true)}>
          <Button color="gray" highContrast>
            Delete Issue
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action is permanent
            and cannot be undone
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel onClick={() => setOpen(false)}>
              <Button variant="soft">Cancel</Button>
            </AlertDialog.Cancel>

            <Button color="gray" highContrast onClick={onDelete}>
              Delete Issue {isSubmitting && <Spinner />}
            </Button>
          </Flex>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDeleteButton;
