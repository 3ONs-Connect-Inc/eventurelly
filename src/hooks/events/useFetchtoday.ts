import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAppSelector } from "../redux";
import { db } from "../../firebase/config";


export const useFetchEvents = (collectionName: string) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeUser = useAppSelector((state) => state.user.activeUser);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        let q;
        const today = new Date().toISOString(); 
        if (collectionName === "bookings") {
          if (!activeUser?.id) {
            setError("User not authenticated");
            setLoading(false);
            return;
          }

          q = query(
            collection(db, collectionName),
            where("userId", "==", activeUser.id),  
            where("eventDate", ">=", today), 
            orderBy("eventDate", "asc") 
          );
        } else {
          q = query(collection(db, collectionName));
        }

        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventsData);
      } catch (err) {
        setError("Failed to fetch events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [collectionName, activeUser?.id]);

  return { events, loading, error };
};


