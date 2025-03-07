"use client";

import type React from "react";
import { useMemo } from "react";
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

interface EarningsHistoryItem {
  month: string;
  earnings: string;
}

interface EarningsChartProps {
  data: EarningsHistoryItem[];
}

const EarningsChart: React.FC<EarningsChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: item.month,
      earnings: Number.parseFloat(item.earnings),
    }));
  }, [data]);

  const maxEarnings = useMemo(() => {
    return Math.max(...chartData.map((item) => item.earnings), 0.01);
  }, [chartData]);

  // Check if all earnings are zero
  const allZero = useMemo(() => {
    return chartData.every((item) => item.earnings === 0);
  }, [chartData]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#615FFF",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #615FFF",
            color: "white",
          }}
        >
          <p>{`${label}: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
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
        <YAxis
          stroke="#F1F5F9"
          tickFormatter={(value) => `$${value.toFixed(2)}`}
          domain={allZero ? [0, 0.01] : [0, "auto"]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="earnings" minPointSize={10} radius={5}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.earnings === maxEarnings && entry.earnings > 0
                  ? "#615FFF"
                  : "#494F54"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EarningsChart;
