import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useMemo } from "react";
import { format } from "date-fns";
import { useDashboardStats } from "../hooks/useDashboardStats";

const OverViewChart = ({ theme }: { theme: "light" | "dark" }) => {
  const { topBookings } = useDashboardStats();

  const overviewData = useMemo(() => {
    const bookingsByMonth: Record<string, number> = {};

    topBookings.forEach((booking) => {
      if (!booking.eventDate) return;

      const monthKey = format(booking.eventDate, "yyyy-MM");
      bookingsByMonth[monthKey] = (bookingsByMonth[monthKey] || 0) + 1;
    });

    return Object.entries(bookingsByMonth)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([key, count]) => ({
        name: format(new Date(key), "MMM yyyy"),
        total: count,
      }));
  }, [topBookings]);

  if (overviewData.length === 0) {
    return <div className="card col-span-1 md:col-span-2 lg:col-span-4">Loading chart...</div>;
  }

  
  return (   
    <div className="card col-span-1 md:col-span-2 lg:col-span-4  ">
      <div className="card-header">
        <p className="card-title">Overview</p>
      </div>
      <div className="card-body p-0 relative z-0">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={overviewData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              cursor={false}
              formatter={(value: number) => `${value} bookings`}
            />
            <XAxis
              dataKey="name"
              strokeWidth={0}
              stroke={theme === "light" ? "#475569" : "#94a3b8"}
              tickMargin={6}
            />
            <YAxis
              dataKey="total"
              strokeWidth={0}
              stroke={theme === "light" ? "#475569" : "#94a3b8"}
              tickMargin={6}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverViewChart;
