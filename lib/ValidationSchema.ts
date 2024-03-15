import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Please enter the title").max(255),
  description: z.string().min(1, "Please add the description"),
});
