import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";

import IssueActions from "./IssueActions";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "../components/Link";
import React from "react";
import delay from "delay";
import prisma from "@/prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  // await delay(2000);

  return (
    <div>
      <IssueActions />
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
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </TableCell>
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
