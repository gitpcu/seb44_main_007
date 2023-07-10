import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Palette from "../../Palette/Palette";

function PieGraph({ data }) {
  const sum = data.reduce((sums, obj) => {
    const { amount, category } = obj;
    if (sums[category]) {
      sums[category] += amount;
    } else {
      sums[category] = amount;
    }
    return sums;
  }, {});
  const chartData = Object.entries(sum)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const chartColors = chartData.map((it) => {
    return Palette[it.name];
  });

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
        outerRadius={70}
        innerRadius={20}
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
