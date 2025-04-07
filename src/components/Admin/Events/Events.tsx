import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { Event } from "../../../types";
import EventForm from "./AddEvents";


const Events = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<Event[]>([]); 
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventList: Event[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Event), 
      }));
      setEvents(eventList);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <button
        onClick={() => setShowAddEvent((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showAddEvent ? "Hide Add Event" : "Add Event"}
      </button>

      {showAddEvent && <EventForm eventId={selectedEventId || undefined} />}

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Events</h2>
        <EventTable events={events} setSelectedEventId={setSelectedEventId} setShowAddEvent={setShowAddEvent} />
      </div>
    </div>
  );
};

const EventTable = ({ events, setSelectedEventId, setShowAddEvent }: { events: Event[], setSelectedEventId: (id: string | null) => void, setShowAddEvent: (show: boolean) => void }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Event Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
              <td className="border p-2">{event.id}</td>
              <td className="border p-2">{event.eventName}</td>
              <td className="border p-2">{event.location}</td>
              <td className="border p-2">{event.duration}</td>
              <td className="border p-2">
                <button
                  onClick={() => { setSelectedEventId(event.id); setShowAddEvent(true); }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
            
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border p-2 text-center">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    
    </div>
  );
};

export default Events;
