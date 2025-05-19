import { useState } from "react";
import { PencilLine, Trash } from "lucide-react";
import { Event } from "../../../types";
import { cardData } from "../../../../data";
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
      await handleDelete(selectedId);
      setShowAlert(false);
      setSelectedId(null);
    }
  };

  const columns: Column<Event>[] = [
    {
      header: "#",
      render: (_, i) => i + 1,
      className: "w-12",
    },
    {
      header: "Image",
      render: (event) => {
        const matchingCard = cardData.find(
          (card) =>
            card.id === event.id ||
            card.eventName.trim().toLowerCase() ===
              event.eventName.trim().toLowerCase()
        );
        const image = matchingCard?.image || "/images/loader.gif";
        return (
          <LazyImage
            src={image}
            alt={event.eventName}
            className="rounded-lg object-cover h-10 w-20"
            quality={80}
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
        <AdminTable columns={columns} data={events} title="" />
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
