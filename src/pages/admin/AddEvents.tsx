import { useParams } from "react-router-dom";
import EventForm from "../../components/Admin/forms/AddEvents";
import { useColor } from "../../hooks/ui/useColor";

const AddEvents = () => {
  const { eventId } = useParams<{ eventId?: string }>();
 const { textColor } = useColor();

  return (
    <div className={`${textColor} flex flex-col gap-y-4`}>
      <h2 className="title">{eventId ? "Edit Event" : "Add New Event"}</h2>
      <EventForm eventId={eventId} />
    </div>
  );
};

export default AddEvents;
