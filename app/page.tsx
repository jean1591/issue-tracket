import { Flex, Grid } from "@radix-ui/themes";

import LastestProjects from "./LastestProjects";
import { Metadata } from "next";
import ProjectChart from "./ProjectChart";
import ProjectSummary from "./ProjectSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const cancelled = await prisma.project.count({
    where: { status: "CANCELLED" },
  });
  const conception = await prisma.project.count({
    where: { status: "CONCEPTION" },
  });
  const inProgress = await prisma.project.count({
    where: { status: "IN_PROGRESS" },
  });
  const terminated = await prisma.project.count({
    where: { status: "TERMINATED" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <ProjectSummary
          cancelled={cancelled}
          conception={conception}
          inProgress={inProgress}
          terminated={terminated}
        />
        <ProjectChart
          cancelled={cancelled}
          conception={conception}
          inProgress={inProgress}
          terminated={terminated}
        />
      </Flex>
      <LastestProjects />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Project Tracker - Dashboard",
  description: "View a summary of all projects",
};
