import { Box, Flex, Grid } from "@radix-ui/themes";

import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import authOptions from "@/app/auth/authOptions";
import { cache } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(id, 10));

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction={"column"} gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(parseInt(id, 10));

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailsPage;
