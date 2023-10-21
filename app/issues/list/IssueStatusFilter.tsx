"use client";

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
  return (
    <Select.Root>
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
