import { FiCalendar } from "react-icons/fi";

interface EventDateProps {
  date: string;
  className?: string;
}

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", // "Sun"
    month: "long", // "April"
    day: "numeric", // "2"
    year: "numeric", // "2025"
    timeZone: "America/New_York", // Adjust based on your needs
  }).format(date);
};

const EventDate: React.FC<EventDateProps> = ({ date, className }) => {
  return (
<>
<p className={`flex items-center gap-2 ${className}`}>
      <FiCalendar className="text-xl" />
      {formatEventDate(date)}
    </p>
</>
  );
};

export default EventDate;
