import { Project, ProjectStatus } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";

import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Link } from "@/app/components";
import NextLink from "next/link";
import { ProjectStatusBadge } from "@/app/components";
import React from "react";

export interface ProjectQuery {
  status: ProjectStatus;
  orderBy: keyof Project;
  page: string;
}

interface Props {
  searchParams: ProjectQuery;
  projects: Project[];
}

const ProjectTable = ({ searchParams, projects }: Props) => {
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
        {projects.map(({ id, title, status, createdAt }) => (
          <Table.Row key={id}>
            <TableCell>
              <Link href={`/projects/${id}`}>{title}</Link>
              <div className="block md:hidden">
                <ProjectStatusBadge status={status} />
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <ProjectStatusBadge status={status} />
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

const columns: { label: string; value: keyof Project; className?: string }[] = [
  { label: "Projects", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map(({ value }) => value);

export default ProjectTable;
