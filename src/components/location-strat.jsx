import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const LocationStrat = function ({ data }) {
  const hash = {};
  data?.forEach(({ city }) => {
    if (hash[city]) {
      hash[city] += 1;
    } else {
      hash[city] = 1;
    }
  });

  let result = [];
  Object.entries(hash).map(([city, count]) => {
    result.push({ city, count });
  });

  console.log(result);

  return (
    <div className="p-5">
      <LineChart
        width={300}
        height={300}
        data={result}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip labelStyle={{ color: "green" }} />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LocationStrat;
