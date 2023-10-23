import { Badge } from "@radix-ui/themes";
import { ProjectStatus } from "@prisma/client";
import React from "react";

interface Props {
  status: ProjectStatus;
}

const statusMap: Record<
  ProjectStatus,
  { label: string; color: "red" | "green" | "violet" | "blue" }
> = {
  CANCELLED: { label: "Cancelled", color: "red" },
  CONCEPTION: { label: "Conception", color: "green" },
  IN_PROGRESS: { label: "In progress", color: "violet" },
  TERMINATED: { label: "Terminated", color: "blue" },
};

const ProjectStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default ProjectStatusBadge;
