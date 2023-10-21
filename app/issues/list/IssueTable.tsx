import { Issue, Status } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";

import { ArrowUpIcon } from "@radix-ui/react-icons";
import { IssueStatusBadge } from "@/app/components";
import { Link } from "@/app/components";
import NextLink from "next/link";
import React from "react";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <TableHeader>
        <TableRow>
          {columns.map(({ label, value, className }) => (
            <TableColumnHeaderCell key={value} className={className}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: value },
                }}
              >
                {label}
              </NextLink>

              {value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </TableColumnHeaderCell>
          ))}
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map(({ value }) => value);

export default IssueTable;
