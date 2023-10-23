import ProjectTable, { ProjectQuery, columnNames } from "./ProjectTable";

import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "@/app/components/Pagination";
import ProjectActions from "./ProjectActions";
import { ProjectStatus } from "@prisma/client";
import prisma from "@/prisma/client";

interface Props {
  searchParams: ProjectQuery;
}

const ProjectsPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(ProjectStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page, 10) || 1;
  const pageSize = 10;

  const projects = await prisma.project.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const projectCount = await prisma.project.count({ where });

  return (
    <Flex direction="column" gap="3">
      <ProjectActions />

      <ProjectTable projects={projects} searchParams={searchParams} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={projectCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project Tracker - Project List",
  description: "View all project projects",
};

export default ProjectsPage;
