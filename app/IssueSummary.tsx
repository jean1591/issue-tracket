import { Card, Flex, Text } from "@radix-ui/themes";

import Link from "next/link";
import React from "react";
import { Status } from "@prisma/client";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Close Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map(({ label, status, value }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${status}`}
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

export default IssueSummary;
