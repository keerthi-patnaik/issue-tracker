"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type AssigneeSelectProps = {
  issue: Issue;
};

const AssigneeSelect = ({ issue }: AssigneeSelectProps) => {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async ({ signal }) => {
      const res = await axios.get<User[]>("/api/users", {
        signal: signal,
      });

      return res.data;
    },
    staleTime: 60 * 1000, //60s
    retry: 2,
  });

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  const updateUser = async (userId: string | null) => {
    let assignedToUserId = userId;
    if (userId === "UnAssigned") {
      assignedToUserId = null;
    }
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: assignedToUserId,
        title: issue.title,
        description: issue.description,
        status: issue.status,
      });
      toast.info("Changes have been saved!");
    } catch (error) {
      toast.error("Changes couldn't be saved!");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "UnAssigned"}
        onValueChange={updateUser}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            <Select.Item value="UnAssigned">UnAssigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item value={user.id} key={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
