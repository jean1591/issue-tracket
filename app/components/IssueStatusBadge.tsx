import { Badge } from "@radix-ui/themes";
import React from "react";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" }
> = {
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In progress", color: "violet" },
  OPEN: { label: "Open", color: "red" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
