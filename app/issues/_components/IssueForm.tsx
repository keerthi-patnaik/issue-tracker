"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { cn } from "@/lib";
import { issueSchema } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { Button, Callout, Flex, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

type IssueFormProps = {
  issue?: Issue;
};

const IssueForm = ({ issue }: IssueFormProps) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: issue || { status: Status.OPEN },
  });

  const onSubmit = async (data: FieldValues) => {
    setSubmitting(true);
    console.log(data);

    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("A unexpected error has occurred");
    }
  };

  return (
    <>
      {error && (
        <Callout.Root className="mb-3 max-w-xl text-sm" color="red" size="1">
          <Callout.Icon>
            <IoIosInformationCircleOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="3">
          <TextField.Root className="flex-[2]">
            <TextField.Input
              className="focus:border-slate-50 focus:ring-1 focus:ring-cyan-500"
              placeholder="Title"
              {...register("title")}
            />
          </TextField.Root>

          <Controller
            name="status"
            control={control}
            render={({ field: { ref, onChange, ...field } }) => {
              return (
                <Select.Root {...field} onValueChange={onChange}>
                  <Select.Trigger placeholder="Status" className="flex-1" />
                  <Select.Content position="popper">
                    {Object.keys(Status).map((status, index) => {
                      return (
                        <Select.Item key={index} value={status}>
                          {status}
                        </Select.Item>
                      );
                    })}
                  </Select.Content>
                </Select.Root>
              );
            }}
          />
        </Flex>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <div className="h-96">
          <Controller
            name="description"
            control={control}
            render={({ field: { ref, ...field } }) => {
              return (
                <SimpleMdeReact
                  {...field}
                  className={cn(
                    "[&:focus-within_.editor-toolbar]:border-x-1 [&:focus-within_.editor-toolbar]:border-t-1 [&:focus-within_.editor-toolbar]:border-x-cyan-500 [&:focus-within_.editor-toolbar]:border-t-cyan-500",
                    "[&:focus-within_.CodeMirror-wrap]:border-x-1 [&:focus-within_.CodeMirror-wrap]:border-b-1 [&:focus-within_.CodeMirror-wrap]:border-x-cyan-500 [&:focus-within_.CodeMirror-wrap]:border-b-cyan-500",
                  )}
                  placeholder="Description"
                />
              );
            }}
          />
        </div>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default IssueForm;
