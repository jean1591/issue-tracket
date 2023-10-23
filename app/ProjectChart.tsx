"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@radix-ui/themes";
import React from "react";

interface Props {
  cancelled: number;
  conception: number;
  inProgress: number;
  terminated: number;
}

const ProjectChart = ({
  cancelled,
  conception,
  inProgress,
  terminated,
}: Props) => {
  const data = [
    { label: "Cancelled", value: cancelled },
    { label: "Conception", value: conception },
    { label: "In Progress", value: inProgress },
    { label: "Terminated", value: terminated },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ProjectChart;
