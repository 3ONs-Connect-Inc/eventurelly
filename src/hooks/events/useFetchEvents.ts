import { useEffect, useState } from "react";
import { collection, query, where,  orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";


export const useFetchEvents = (collectionName: string) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    setLoading(true);
    let q;
    const today = new Date().toISOString();

    if (collectionName === "bookings") {
      q = query(
        collection(db, collectionName),
        where("eventDate", ">=", today),
        orderBy("eventDate", "asc")
      );
    } else {
      q = query(collection(db, collectionName));
    }

    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
        setLoading(false);
      },
      (err: any) => {
        setError("Failed to fetch events.");
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { events, loading, error };
};