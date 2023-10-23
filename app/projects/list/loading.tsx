import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";

import ProjectActions from "./ProjectActions";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadingProjectsPage = () => {
  const projects = [1, 2, 3, 4, 5];

  return (
    <div>
      <ProjectActions />
      <Table.Root variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Projects</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Created
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <Table.Row key={project}>
              <TableCell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </div>
  );
};

export default LoadingProjectsPage;
