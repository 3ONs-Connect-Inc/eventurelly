import React from "react";
import { useNavigate } from "react-router-dom"; 
import { BookingData } from "../../../types";
import { Eye } from "lucide-react";
import LazyImage from "../../LazyImage";
import { cardData } from "../../../../data";
import { Button } from "../ui/Button";
import { AdminTable, Column } from "./AdminTable";

export const BookingsTable: React.FC<{ topBookings: BookingData[] }> = ({
  topBookings,
}) => {
  const navigate = useNavigate();

  const bookingColumns: Column<BookingData>[] = [
    {
      header: "#",
      render: (_, i) => i + 1,
      className: "w-12",
    },
    {
      header: "Image",
      render: (booking) => {
        const match = cardData.find(
          (card) =>
            card.id === booking.eventId ||
            card.eventName.trim().toLowerCase() ===
              booking.eventName.trim().toLowerCase()
        );
        const image = match?.image || "/images/loader.gif";
        return (
          <LazyImage
            src={image}
            alt={booking.eventName}
            className="rounded-lg object-cover h-15 w-20"
          />
        );
      },
      className: "w-20",
    },
    {
      header: "Event",
      render: (booking) => (
        <div>
          <p className="w-60 truncate">{booking.eventName}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
            {booking.eventDescription}
          </p>
        </div>
      ),
      className: "w-80",
    },
    {
      header: "Actions",
      render: (booking) =>
        booking.bookingId &&
        booking.slug && (
          <Button
            onClick={() =>
              navigate(
                `/event-details/bookings/${
                  booking.bookingId
                }/${booking.slug!.replace(/\s+/g, "-")}`
              )
            }
            aria-label="Bookings View"
            className="text-blue-500 dark:text-blue-600"
          >
            <Eye size={20} />
          </Button>
        ),
      className: "w-32",
    },
  ];

  return (
    <AdminTable
      title="Top Bookings"
      data={topBookings}
      columns={bookingColumns}
    />
  );
};
