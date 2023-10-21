"use client";

import { useRouter, useSearchParams } from "next/navigation";

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
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
        router.push(`/issues/list${query}`);
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

export default IssueStatusFilter;
