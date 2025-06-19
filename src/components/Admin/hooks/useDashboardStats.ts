import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { BookingData } from "../../../types";

interface DashboardStats {
  totalEvents: number;
  totalBookings: number;
  totalUsers: number;
  totalDemoRequest: number;
  recentDemoRequests: any[];
  topBookings: BookingData[];
}

export const useDashboardStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalDemoRequest: 0,
    recentDemoRequests: [],
    topBookings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [
        eventsSnap,
        bookingsSnap,
        usersSnap,
        demoSnap,
        recentDemoSnap,
        topBookingsSnap,
      ] = await Promise.all([
        getDocs(collection(db, "events")),
        getDocs(collection(db, "bookings")),
        getDocs(collection(db, "users")),
        getDocs(collection(db, "demoRequests")),
        getDocs(query(collection(db, "demoRequests"), orderBy("timestamp", "desc"))),
        getDocs(query(collection(db, "bookings"), orderBy("eventDate", "desc"))),
      ]);

      const recentDemoRequests = recentDemoSnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          ...data,
        };
      });



      const topBookings: BookingData[] = topBookingsSnap.docs.map((doc) => {
        const data = doc.data();
      
        // Defensive check to extract eventDate
        let eventDate: Date | null = null;
      
        if (data.eventDate instanceof Timestamp) {
          eventDate = data.eventDate.toDate();
        } else if (data.eventDate && typeof data.eventDate.toDate === "function") {
          eventDate = data.eventDate.toDate(); // Covers edge cases
        } else if (typeof data.eventDate === "string" || typeof data.eventDate === "number") {
          const parsed = new Date(data.eventDate);
          eventDate = isNaN(parsed.getTime()) ? null : parsed;
        }
      
        return {
          bookingId: doc.id,
          eventNamePrefix: data.eventNamePrefix || "",
          userId: data.userId,
          slug: data.slug,
          eventId: data.eventId,
          eventName: data.eventName,
          eventImage: data.eventImage,
          eventDate, // now safely parsed
          optionalServices: data.optionalServices || {},
          eventDescription: data.eventDescription,
          eventFormat: data.eventFormat,
          location: data.location,
          eventCategory: data.eventCategory,
          searchKeywords: data.searchKeywords,
          expectedOutcome: data.expectedOutcome,
          duration: data.duration,
          teamSize: data.teamSize,
          servicesIncluded: data.servicesIncluded || [],
          servicesNotIncluded: data.servicesNotIncluded || [],
        };
      });
      

      setStats({
        totalEvents: eventsSnap.size,
        totalBookings: bookingsSnap.size,
        totalUsers: usersSnap.size,
        totalDemoRequest: demoSnap.size,
        recentDemoRequests,
        topBookings,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  return {...stats, loading}
};
