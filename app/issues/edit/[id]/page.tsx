import IssueFormSkeleton from "./loading";
import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
