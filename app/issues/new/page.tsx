"use client";

import { cn } from "@/lib";
import { issueSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { z } from "zod";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("A unexpected error has happened");
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
        <TextField.Root>
          <TextField.Input
            className="focus:border-slate-50 focus:ring-1 focus:ring-cyan-500"
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && (
          <p className="text-sm text-rose-700">{errors.title.message}</p>
        )}
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
        {errors.description && (
          <p className="text-sm text-rose-700">{errors.description.message}</p>
        )}

        <Button type="submit">Submit New Issue</Button>
      </form>
    </>
  );
};

export default NewIssuePage;
