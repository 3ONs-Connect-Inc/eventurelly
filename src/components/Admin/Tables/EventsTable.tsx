import { useState } from "react";
import { PencilLine, Trash } from "lucide-react";
import { Event } from "../../../types";
import LazyImage from "../../LazyImage";
import { Button } from "../ui/Button";
import { useEventForm } from "../hooks/useEventForm";
import DeleteAlert from "../../ui/modal/DeleteAlert";
import { AdminTable, Column } from "./AdminTable";

interface Props {  
  events: Event[];
  onEdit: (id: string) => void;
}
  
const EventsTable = ({ events, onEdit }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedEventName, setSelectedEventName] = useState<string | null>(
    null
  );
  const [showAlert, setShowAlert] = useState(false);
  const { handleDelete } = useEventForm();

 const confirmDelete = async () => {
  if (selectedId) {
    const event = events.find(e => e.id === selectedId);
    if (event) {
      await handleDelete(selectedId, event.eventImage);
    }
    setShowAlert(false);
    setSelectedId(null);
  }
};
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA - dateB; // Ascending order
  });

  const columns: Column<Event>[] = [
    {
      header: "#",
      render: (_, i) => i + 1,
      className: "w-12",
    },
    {
  header: "Image",
  render: (event) => {
    const image = event.eventImage || "/images/placeholder.png";
    return (
      <LazyImage
        src={image}
        alt={event.eventName}
        className="rounded-lg object-cover h-10 w-20"
     
      />
    );
  },
  className: "w-25",
},
   
    {
      header: "Event Name",
      render: (event) => (
        <div>
          <p className="w-60 truncate">{event.eventName}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 w-60 truncate">
            {event.eventDescription}
          </p>
        </div>
      ),
      className: "w-80",
    },
    {
      header: "Location",
      render: (event) => <p>{event.location}</p>,
      className: "w-50 truncate",
    },
    {
      header: "Duration",
      render: (event) => <p>{event.duration}</p>,
      className: "w-50",
    },    
    {
      header: "Actions",
      render: (event) => (
        <div className="flex items-center gap-x-4">
          <Button
            onClick={() => onEdit(event.id)}
            aria-label="Edit event"
            className="text-blue-500 dark:text-blue-600"
          >
            <PencilLine size={20} />
          </Button>
          <Button
            onClick={() => {
              setSelectedId(event.id);
              setSelectedEventName(event.eventName);
              setShowAlert(true);
            }}
            aria-label="Delete event"
            className="text-red-500"
          >
            <Trash size={20} />
          </Button>
        </div>
      ),
      className: "w-32",
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">All Events</p>
      </div>

      <div className="card-body p-0">
        <AdminTable columns={columns} data={sortedEvents}  title="" />
      </div>

      {showAlert && selectedId && (
        <DeleteAlert
          title="Delete Event?"
          message={`Are you sure you want to delete "${selectedEventName}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => {
             setShowAlert(false);
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
};

export default EventsTable;
