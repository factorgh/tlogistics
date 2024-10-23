import { Card } from "antd";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Sample Data

const data02 = [
  { name: "Mon", value: 2400 },
  { name: "Wed", value: 4567 },
  { name: "Tues", value: 1398 },
  { name: "Thurs", value: 9800 },
  { name: "Fri", value: 3908 },
  { name: "Sat", value: 4800 },
  { name: "Sun", value: 4800 },
];

// Responsive Card Component with PieChart
const ResponsivePieChartCard = () => {
  return (
    <div className="p-4">
      <Card
        className="border border-gray-200 rounded-md"
        title={
          <div style={{ color: "#4786EB", textAlign: "left" }}>
            Payment Received
          </div>
        }
        bordered={false}
        style={{ width: "100%" }}
      >
        {/* Responsive container to ensure the pie chart adapts to screen size */}
        <div className="w-72 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend
                verticalAlign="bottom"
                align="center" // Center the legend
                iconSize={10} // Smaller icon size
                wrapperStyle={{ fontSize: "12px" }} // Adjust text size
                height={40} // Adjust height as needed
              />
              {/* <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              /> */}
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#4786EB"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ResponsivePieChartCard;
