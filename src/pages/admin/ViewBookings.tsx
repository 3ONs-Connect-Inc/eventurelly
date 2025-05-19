import { BookingsTable} from "../../components/Admin/Tables/BookingTable";
import { useDashboardStats } from "../../components/Admin/hooks/useDashboardStats";

const ViewBookings = () => {
  const { topBookings, loading } = useDashboardStats();
  const isLoading = loading || topBookings.length === 0;

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Bookings</h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading top bookings...</p>
      ) : (
        <BookingsTable topBookings={topBookings} />
      )}
    </div>
  );
};

export default ViewBookings;
