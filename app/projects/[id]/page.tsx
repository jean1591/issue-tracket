import { Box, Flex, Grid } from "@radix-ui/themes";

import AssigneeSelect from "./AssigneeSelect";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";
import ProjectDetails from "./ProjectDetails";
import authOptions from "@/app/auth/authOptions";
import { cache } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

const fetchProject = cache((projectId: number) =>
  prisma.project.findUnique({
    where: { id: projectId },
  })
);

const ProjectDetailsPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  const project = await fetchProject(parseInt(id, 10));

  if (!project) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <ProjectDetails project={project} />
      </Box>

      {session && (
        <Box>
          <Flex direction={"column"} gap="4">
            <AssigneeSelect project={project} />
            <EditProjectButton projectId={project.id} />
            <DeleteProjectButton projectId={project.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const project = await fetchProject(parseInt(id, 10));

  return {
    title: project?.title,
    description: `Details of project ${project?.id}`,
  };
}

export default ProjectDetailsPage;
