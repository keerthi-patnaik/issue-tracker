"use client";

import { issueSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });

  const onSubmit = async (body: FieldValues) => {
    await axios.post("/api/issues", body);
    router.push("/issues");
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      {errors.title && <p>{errors.title.message}</p>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <SimpleMdeReact {...field} placeholder="Description" />;
        }}
      />
      {errors.description && <p>{errors.description.message}</p>}

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
