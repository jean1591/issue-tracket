"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ProjectStatus } from "@prisma/client";
import React from "react";
import { Select } from "@radix-ui/themes";

const status: { label: string; value?: ProjectStatus }[] = [
  { label: "All" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Conception", value: "CONCEPTION" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Terminated", value: "TERMINATED" },
];

const ProjectStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) {
          params.append("status", status);
        }

        const orderBy = searchParams.get("orderBy");
        if (orderBy) {
          params.append("orderBy", orderBy);
        }

        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/projects/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />

      <Select.Content>
        {status.map(({ label, value }) => (
          <Select.Item key={value} value={value || ""}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ProjectStatusFilter;
