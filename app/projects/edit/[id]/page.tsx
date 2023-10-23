import ProjectFormSkeleton from "./loading";
import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

const ProjectForm = dynamic(
  () => import("@/app/projects/_components/ProjectForm"),
  {
    ssr: false,
    loading: () => <ProjectFormSkeleton />,
  }
);

interface Props {
  params: { id: string };
}

const EditProjectPage = async ({ params: { id } }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!project) {
    notFound();
  }

  return <ProjectForm project={project} />;
};

export default EditProjectPage;
