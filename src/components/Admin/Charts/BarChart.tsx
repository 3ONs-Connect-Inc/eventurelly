import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { Card, CardContent } from "../ui/Card";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 600 },
  { name: "Mar", sales: 800 },
];

const BarCharts = () => {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Sales Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarCharts;
