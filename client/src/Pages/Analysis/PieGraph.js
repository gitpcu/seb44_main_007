import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import Palette from "../../Palette/Palette";

function PieGraph({ data }) {
  const [dataType, setDataType] = useState(null);

  useEffect(() => {
    if (data.length !== 0) {
      setDataType(data[0].type);
    }
  }, [data]);
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
  // const top3Data = sortData.slice(0, 3);
  // const restData = sortData.slice(3);
  // const chartData = [
  //   ...top3Data,
  //   {
  //     name:
  //       dataType === "지출"
  //         ? "기타지출"
  //         : dataType === "수입"
  //         ? "기타수입"
  //         : null,
  //     value: restData.reduce((sum, obj) => sum + obj.value, 0),
  //   },
  // ];
  const chartColors = chartData.map((it) => {
    return Palette[it.name];
  });

  return (
    <PieChart
      width={180}
      height={180}
      style={{ marginLeft: "5%", width: "35%" }}
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
        stroke="none"
        strokeWidth={1}
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={chartColors[index % chartColors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default PieGraph;
