"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type IssueChartProps = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueChart = ({ open, inProgress, closed }: IssueChartProps) => {
  const data = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
    {
      label: "Closed",
      value: closed,
    },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-a9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
