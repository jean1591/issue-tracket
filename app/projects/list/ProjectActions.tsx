import { Button, Flex } from "@radix-ui/themes";

import Link from "next/link";
import ProjectStatusFilter from "./ProjectStatusFilter";
import React from "react";

const ProjectActions = () => {
  return (
    <Flex justify="between">
      <ProjectStatusFilter />
      <Button>
        <Link href="/projects/new">New Project</Link>
      </Button>
    </Flex>
  );
};

export default ProjectActions;
