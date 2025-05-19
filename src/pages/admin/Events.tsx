import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { Event } from "../../types";
import { useColor } from "../../components/Admin/ui/useColor";
import EventsTable from "../../components/Admin/Tables/EventsTable";


const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { textColor } = useColor();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventList: Event[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Event),
        id: doc.id,
      }));
      setEvents(eventList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`${textColor} flex flex-col gap-y-4`}>
      <h2 className="title">Events</h2>
      <EventsTable events={events} onEdit={(id) => navigate(`/admin/events/${id}`)} />
    </div>
  );
};



export default Events;
