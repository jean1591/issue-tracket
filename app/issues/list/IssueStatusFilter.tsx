"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
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
