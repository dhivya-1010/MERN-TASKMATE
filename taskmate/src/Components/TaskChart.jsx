import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TaskChart = ({ tasklist }) => {
  const completed = tasklist.filter(t => t.completed).length;
  const pending = tasklist.length - completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TaskChart;
