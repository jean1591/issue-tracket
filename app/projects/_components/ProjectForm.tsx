"use client";

import "easymde/dist/easymde.min.css";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";

import { AiOutlineCloseCircle } from "react-icons/ai";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Project } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { createProjectSchema } from "@/app/validationSchemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ProjectFormData = z.infer<typeof createProjectSchema>;

interface Props {
  project?: Project;
}

const ProjectForm = ({ project }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (project) {
        await axios.patch(`/api/projects/${project.id}`, data);
      } else {
        await axios.post("/api/projects", data);
      }
      router.push("/projects/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiOutlineCloseCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            {...register("title")}
            defaultValue={project?.title}
          ></TextField.Input>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={project?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {project ? "Update Project" : "Submit New Project"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
