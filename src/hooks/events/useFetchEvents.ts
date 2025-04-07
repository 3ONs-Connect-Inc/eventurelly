import { useEffect, useState } from "react";
import { collection, query, where,  orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAppSelector } from "../redux";


export const useFetchEvents = (collectionName: string) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeUser = useAppSelector((state) => state.user.activeUser);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchCompanyEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const today = new Date().toISOString();

        const currentCompany = activeUser?.companyName;
        if (!currentCompany) {
          setEvents([]);
          setLoading(false);
          return;
        }

        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef, where("companyName", "==", currentCompany));
        const userSnapshots = await getDocs(usersQuery);
        const companyUserIds = userSnapshots.docs.map((doc) => doc.id);

        const bookingsRef = collection(db, collectionName);
        const bookingsQuery = query(
          bookingsRef,
          where("userId", "in", companyUserIds),
          where("eventDate", ">=", today),
          orderBy("eventDate", "asc")
        );

        unsubscribe = onSnapshot(
          bookingsQuery,
          (querySnapshot) => {
            const bookingsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setEvents(bookingsData);
            setLoading(false);
          },
          (err) => {
            console.error("Failed to fetch company events", err);
            setError("Failed to fetch events.");
            setLoading(false);
          }
        );
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Error loading bookings.");
        setLoading(false);
      }
    };

    const fetchGeneralEvents = () => {
      setLoading(true);
      setError(null);

      const q = query(collection(db, collectionName));
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const eventsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEvents(eventsData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching events:", err);
          setError("Failed to fetch events.");
          setLoading(false);
        }
      );
    };

    if (collectionName === "bookings") {
      if (activeUser) {
        fetchCompanyEvents();
      } else {
        // Prevent fetching bookings if not authenticated
        setEvents([]);
        setLoading(false);
        setError("Login required to view bookings.");
      }
    } else {
      fetchGeneralEvents();
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [collectionName, activeUser]);

  return { events, loading, error, setLoading };
};