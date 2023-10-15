import { Box, Grid } from "@radix-ui/themes";

import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
