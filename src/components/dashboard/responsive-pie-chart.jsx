import { Card } from "antd";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Sample Data with Unique Colors for Each Slice
const data02 = [
  { name: "Mon", value: 2400, color: "#4786EB" },
  { name: "Wed", value: 4567, color: "#FF6384" },
  { name: "Tues", value: 1398, color: "#FFCE56" },
  { name: "Thurs", value: 9800, color: "#36A2EB" },
  { name: "Fri", value: 3908, color: "#4BC0C0" },
  { name: "Sat", value: 4800, color: "#9966FF" },
  { name: "Sun", value: 3800, color: "#FF9F40" },
];

// Responsive Card Component with PieChart
const ResponsivePieChartCard = () => {
  return (
    <div className="p-4">
      <Card
        className="border border-gray-300 rounded-md shadow-lg"
        title={
          <div style={{ color: "#4786EB", textAlign: "left" }}>
            Payment Received
          </div>
        }
        bordered={false}
        style={{ width: "100%" }}
      >
        <div className="w-72 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend
                verticalAlign="bottom"
                align="center"
                iconSize={10}
                wrapperStyle={{ fontSize: "12px" }}
                height={40}
              />
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                label
              >
                {data02.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ResponsivePieChartCard;
