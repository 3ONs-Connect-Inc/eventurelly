import {
  CreditCard,
  DollarSign,
  Package,
  Users,
} from "lucide-react";
import { useTheme } from "../../components/Admin/hooks/use-theme";
import { Footer } from "../../components/Admin/layouts/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDashboardStats } from "../../components/Admin/hooks/useDashboardStats";
import OverViewChart from "../../components/Admin/Charts/OverViewCharts";
import {BookingsTable} from "../../components/Admin/Tables/BookingTable";


const DashboardPage = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    totalEvents,
    totalBookings,
    totalUsers,
    totalDemoRequest,
    recentDemoRequests,
    topBookings,
    loading,
  } = useDashboardStats();
 


  useEffect(() => {
    if (location.state?.openFromSidebar) {
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  const isLoading = loading || topBookings.length === 0;

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            icon: <Package size={26} />,
            title: "Total Events",
            value: totalEvents.toLocaleString(),
          },
          {
            icon: <DollarSign size={26} />,
            title: "Total Bookings",
            value: totalBookings.toLocaleString(),
          },
          {
            icon: <Users size={26} />,
            title: "Total Users",
            value: totalUsers.toLocaleString(),
          },
          {
            icon: <CreditCard size={26} />,
            title: "Total Demo Request",
            value: totalDemoRequest.toLocaleString(),
          },
        ].map(({ icon, title, value }, i) => (
          <div className="card" key={i}>
            <div className="card-header">
              <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                {icon}
              </div>
              <p className="card-title">{title}</p>
            </div>
            <div className="card-body bg-slate-100 dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverViewChart theme={theme === "system" ? "light" : theme} />

        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Recent Demo Requests</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-0">
            {recentDemoRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between gap-x-4 py-2 pr-2"
              >
                <div className="flex items-center gap-x-4">
                  <img
                    src="/images/avatar.png"
                    alt={request.firstName}
                    className="size-10 flex-shrink-0 rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-y-2">
                    <p className="font-medium flex  text-slate-900 dark:text-slate-50">
                      {request.firstName} {request.lastName}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {request.email}
                    </p>
                    <p className="font-medium text-slate-900 dark:text-slate-50">
                  {request.organizationName}
                </p>
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading top bookings...</p>
      ) : (
        <BookingsTable topBookings={ topBookings }/>
      )}
      <Footer />
    </div>
  );
};

export default DashboardPage;
