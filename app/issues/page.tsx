import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";

import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      <Table.Root variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Created
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {issues.map(({ id, title, status, createdAt }) => (
            <Table.Row key={id}>
              <TableCell>
                {title}
                <div className="block md:hidden">{status}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{status}</TableCell>
              <TableCell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </TableCell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
