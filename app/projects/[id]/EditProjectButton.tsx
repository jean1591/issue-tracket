import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
  projectId: number;
}

const EditProjectButton = ({ projectId }: Props) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/projects/edit/${projectId}`}>Edit Project</Link>
    </Button>
  );
};

export default EditProjectButton;
