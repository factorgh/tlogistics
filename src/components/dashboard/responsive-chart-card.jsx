import { Card } from "antd";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample Data
const data = [
  { name: "Mon", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Tues", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Wed", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Thurs", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Fri", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Sat", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Sun", uv: 3490, pv: 4300, amt: 2100 },
];

// Responsive Card Component with LineChart
const ResponsiveChartCard = () => {
  return (
    <div className="p-2 ">
      <Card
        className="border border-gray-200 rounded-md"
        title={
          <div style={{ color: "#4786EB", textAlign: "left" }}>
            {" "}
            {/* Change color as needed */}
            Shipment Overview
          </div>
        }
        bordered={false}
        style={{ width: "100%" }}
      >
        {/* Responsive container to make the chart responsive */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                name="pv of pages"
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
              />
              <Line
                name="uv of pages"
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ResponsiveChartCard;
