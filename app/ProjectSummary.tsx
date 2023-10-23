import { Card, Flex, Text } from "@radix-ui/themes";

import Link from "next/link";
import { ProjectStatus } from "@prisma/client";
import React from "react";

interface Props {
  cancelled: number;
  conception: number;
  inProgress: number;
  terminated: number;
}

const ProjectSummary = ({
  cancelled,
  conception,
  inProgress,
  terminated,
}: Props) => {
  const containers: { label: string; value: number; status: ProjectStatus }[] =
    [
      { label: "Cancelled Projects", value: cancelled, status: "CANCELLED" },
      {
        label: "In-conception Projects",
        value: conception,
        status: "CONCEPTION",
      },
      {
        label: "In-progress Projects",
        value: inProgress,
        status: "IN_PROGRESS",
      },
      { label: "Terminated Projects", value: terminated, status: "TERMINATED" },
    ];

  return (
    <Flex gap="4">
      {containers.map(({ label, status, value }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/projects/list?status=${status}`}
              className="text-small font-medium"
            >
              {label}
            </Link>
            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default ProjectSummary;
