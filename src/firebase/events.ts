import { 
  collection, 
  DocumentData, 
  getDocs, 
  orderBy, 
  Query, 
  query, 
  where, 
} from "firebase/firestore";
import { db } from "./config";

interface SearchableEvent {
  id: string;
  eventName?: string;
  eventNameLower?: string;
  eventNamePrefixLower?: string;
  searchKeywords?: string[];  
  collectionName: string;
}


export const searchEventsAndBookings = async (
  searchTerm: string,
  selectedFilters: { [key: string]: string }
): Promise<SearchableEvent[]> => {  // ✅ Now returns a typed array
  try {
    const eventCollectionRef = collection(db, "events");
    const bookingCollectionRef = collection(db, "bookings");

    const queries: Query<DocumentData>[] = [];

    if (searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase();

      queries.push(
        query(
          eventCollectionRef,
          orderBy("eventNameLower"),
          where("eventNameLower", ">=", normalizedSearch),
          where("eventNameLower", "<=", normalizedSearch + "\uf8ff")
        ),
        query(
          bookingCollectionRef,
          orderBy("eventNamePrefixLower"),
          where("eventNamePrefixLower", ">=", normalizedSearch),
          where("eventNamePrefixLower", "<=", normalizedSearch + "\uf8ff")
        )
      );
    } else {
      queries.push(query(eventCollectionRef), query(bookingCollectionRef));
    }

    // Fetch results in parallel
    const snapshots = await Promise.all(queries.map((q) => getDocs(q)));

    const eventResults: SearchableEvent[] = snapshots[0]?.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      collectionName: "events"
    })) || [];

    const bookingResults: SearchableEvent[] = snapshots[1]?.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      collectionName: "bookings"
    })) || [];

    let results = [...eventResults, ...bookingResults];

    // 🔹 Apply dropdown filters (client-side filtering)
    Object.values(selectedFilters).forEach((filterValue) => {
      if (filterValue) {
        results = results.filter(event => 
          event.searchKeywords && event.searchKeywords.includes(filterValue.toLowerCase())
        );
      }
    });

    return results;
  } catch (error: any) {
    console.error("Error searching data: ", error.message);
    return [];
  }
};

