import { PieChart, Pie, Cell } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const DeviceStrat = function ({ data }) {
  const hash = {};
  data?.forEach(({ device }) => {
    if (hash[device]) {
      hash[device] += 1;
    } else {
      hash[device] = 1;
    }
  });

  let result = [];
  Object.entries(hash).map(([device, count]) => {
    result.push({ device, count });
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={result}
          dataKey="count"
          outerRadius={60}
          label={({ device, percent }) =>
            `${device} : ${(percent * 100).toFixed(0)}%`
          }
        >
          {result.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default DeviceStrat;
