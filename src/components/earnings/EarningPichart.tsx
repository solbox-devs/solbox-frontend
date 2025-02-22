"use client";

import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#9D48C7", "#615FFF", "#275165"]; // Gradient colors

const data = [
  { name: "Progress", value: 16 }, // Filled part
  { name: "Remaining", value: 84 }, // Empty space
];

const EarningPichart = () => {
  return (
    <Box position="relative" width={120} height={120}>
      {/* Pie Chart */}
      <PieChart width={120} height={120}>
        {/* Outer Gradient Pie */}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35} // Reduced size
          outerRadius={45} // Reduced size
          startAngle={90}
          endAngle={-30}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Inner Circle (Center Fill) */}
        <Pie
          data={[{ value: 1 }]}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={28} // Reduced size
          fill="#0F2C3A"
          dataKey="value"
        />
      </PieChart>

      {/* Centered Percentage Text */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <ChevronUpIcon color="white" boxSize={3} /> {/* Smaller arrow */}
        <Text fontSize="14px" fontWeight="bold" color="white">
          16%
        </Text>
      </Box>
    </Box>
  );
};

export default EarningPichart;
