import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";

import Link from "next/link";
import { ProjectStatusBadge } from "./components";
import React from "react";
import prisma from "@/prisma/client";

const LastestProjects = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Project
      </Heading>
      <Table.Root>
        <Table.Body>
          {projects.map(({ assignedToUser, id, title, status }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/projects/${id}`}>{title}</Link>
                    <ProjectStatusBadge status={status} />
                  </Flex>

                  {assignedToUser && (
                    <Avatar
                      src={assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LastestProjects;
