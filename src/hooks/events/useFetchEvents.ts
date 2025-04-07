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
    if (!collectionName || !activeUser) return;

    const fetchCompanyEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const today = new Date().toISOString();

        // Step 1: Get the active user's company name
        const currentCompany = activeUser.companyName;

        // Step 2: Get all users with the same company name
        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef, where("companyName", "==", currentCompany));
        const userSnapshots = await getDocs(usersQuery);
        const companyUserIds = userSnapshots.docs.map((doc) => doc.id);

        // Step 3: Get bookings by these user IDs
        const bookingsRef = collection(db, collectionName);
        const bookingsQuery = query(
          bookingsRef,
          where("userId", "in", companyUserIds),
          where("eventDate", ">=", today),
          orderBy("eventDate", "asc")
        );

        const unsubscribe = onSnapshot(
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

        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Error loading events.");
        setLoading(false);
      }
    };

    if (collectionName === "bookings") {
      fetchCompanyEvents();
    } else {
      // Default fetch for other collection types like 'events'
      const q = query(collection(db, collectionName));
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
        (err) => {
          console.error("Error fetching events:", err);
          setError("Failed to fetch events.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, [collectionName, activeUser]);

  return { events, loading, error, setLoading };
};