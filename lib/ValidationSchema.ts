import { Status } from "@prisma/client";
import { z } from "zod";

const statuses = [Status.CLOSED, Status.OPEN, Status.INPROGRESS] as const;

export const issueSchema = z.object({
  title: z.string().min(1, "Please enter the title").max(255),
  description: z.string().min(1, "Please add the description").max(300),
  status: z.enum(statuses, {
    errorMap: () => ({ message: "status is required" }),
  }),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
