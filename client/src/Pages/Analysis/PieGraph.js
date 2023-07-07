import React from "react";
import { PieChart, Pie, Cell } from "recharts";

function PieGraph() {
  const chartData = [
    { name: "Label 1", value: 52 },
    { name: "Label 2", value: 23 },
    { name: "Label 3", value: 25 },
  ];
  const chartColors = ["#F4CD72", "#EF9620", "#835BA1"];
  return (
    <PieChart
      width={180}
      height={180}
      style={{ marginLeft: "10%", width: "35%" }}
    >
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        innerRadius={10}
        startAngle={90}
        endAngle={-270}
        fill="#8884d8"
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={chartColors[index % chartColors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default PieGraph;
