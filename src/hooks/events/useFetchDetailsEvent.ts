import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, } from "../../firebase/config"; // Ensure auth is imported
import { Event } from "../../types";

export const useFetchEventDetail = (collectionName: string, eventId?: string) => {
  const [eventDetail, setEventDetail] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId || !collectionName) return;

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
      
        const docRef = doc(db, collectionName, eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEventDetail({ id: docSnap.id, ...docSnap.data() } as Event);
        } else {
          setError("Event not found.");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [collectionName, eventId]);

  return { eventDetail, loading, error };
};
