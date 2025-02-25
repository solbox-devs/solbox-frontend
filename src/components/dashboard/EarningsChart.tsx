"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataItem {
  name: string;
  earnings: number;
}

const data: DataItem[] = [
  { name: "Jan", earnings: 4000 },
  { name: "Feb", earnings: 3000 },
  { name: "Mar", earnings: 2000 },
  { name: "Apr", earnings: 2780 },
  { name: "May", earnings: 1890 },
  { name: "Jun", earnings: 2390 },
  { name: "Jul", earnings: 3490 },
  { name: "Aug", earnings: 4300 },
  { name: "Sep", earnings: 4800 },
  { name: "Oct", earnings: 5200 },
  { name: "Nov", earnings: 3800 },
  { name: "Dec", earnings: 2900 },
];

const maxEarnings = Math.max(...data.map((item) => item.earnings));

const EarningsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={30}
        barGap={20}
      >
        <CartesianGrid strokeDasharray="" stroke="#E2E8F033" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#F1F5F9"
          scale="point"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "#615FFF", // Set your custom background color here
            borderRadius: "5px", // Optional: Add border radius for rounded corners
            border: "1px solid #615FFF", // Optional: Add border
            color: "white", // Optional: Change text color
          }}
        />
        {/* <Legend /> */}
        <Bar dataKey="earnings" minPointSize={10} radius={5}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.earnings === maxEarnings ? "#615FFF" : "#494F54"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EarningsChart;
