import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit issue</Link>
    </Button>
  );
};

export default EditIssueButton;
