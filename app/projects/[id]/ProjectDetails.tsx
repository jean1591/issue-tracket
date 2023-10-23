import { Card, Flex, Heading, Text } from "@radix-ui/themes";

import { Project } from "@prisma/client";
import { ProjectStatusBadge } from "@/app/components";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  project: Project;
}

const ProjectDetails = ({ project }: Props) => {
  return (
    <div>
      <Heading>{project.title}</Heading>

      <Flex className="space-x-3" my="2">
        <ProjectStatusBadge status={project.status} />
        <Text>{project.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default ProjectDetails;
