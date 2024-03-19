"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type IssueDeleteButtonProps = {
  issueId: number;
};

const IssueDeleteButton = ({ issueId }: IssueDeleteButtonProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray" highContrast>
          Delete Issue
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? You want to delete this issue?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="gray" highContrast>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default IssueDeleteButton;
