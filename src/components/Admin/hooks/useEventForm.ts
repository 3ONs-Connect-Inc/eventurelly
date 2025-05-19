import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  deleteDoc,
  writeBatch,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { Event } from "../../../types";
import { useAppSelector } from "../../../hooks/redux";
import { db } from "../../../firebase/config";
import { addEvent, updateEvent } from "../../../firebase/admin/events";
import { toast } from "react-toastify";

export const useEventForm = (eventId?: string) => {
  const [eventData, setEventData] = useState<Omit<Event, "id">>({
    eventName: "",
    eventTagline: "",
    eventDescription: "",
    slug: "",
    eventFormat: "",
    location: "",
    duration: "",
    teamSize: "",
    eventCategory: "",
    expectedOutcome: "",
    agendas: [],
    servicesIncluded: [],
    servicesNotIncluded: [],
    optionalServices: {},
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const activeUser = useAppSelector((state) => state.user.activeUser);

  useEffect(() => {
    if (!eventId) {
      // Reset the form when no eventId (i.e., switching to add mode)
      setEventData({
        eventName: "",
        eventTagline: "",
        eventDescription: "",
        slug: "",
        eventFormat: "",
        location: "",
        duration: "",
        teamSize: "",
        eventCategory: "",
        expectedOutcome: "",
        agendas: [],
        servicesIncluded: [],
        servicesNotIncluded: [],
        optionalServices: {},
      });
      return;
    }

    const fetchEvent = async () => {
      const eventRef = doc(db, "events", eventId);
      const eventSnap = await getDoc(eventRef);
      if (eventSnap.exists()) {
        setEventData(eventSnap.data() as Omit<Event, "id">);
      }
    };

    fetchEvent();
  }, [eventId]);

  const generateSearchKeywords = () => {
    const keywords = new Set<string>();
    const addKeyword = (text?: string) => {
      if (text) {
        keywords.add(text.toLowerCase());
        text
          .toLowerCase()
          .split(" ")
          .forEach((word) => {
            if (word.length > 2) keywords.add(word);
          });
      }
    };
    addKeyword(eventData.eventName);
    addKeyword(eventData.eventCategory);
    addKeyword(eventData.teamSize);
    addKeyword(eventData.eventFormat);
    addKeyword(eventData.expectedOutcome);
    return Array.from(keywords);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "eventName") {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      return updated;
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!activeUser?.id) {
      setMessage("User not authenticated.");
      setLoading(false);
      return;
    }

    const { eventName, eventDescription, slug } = eventData;
    if (!eventName || !eventDescription || !slug) {
      toast.info("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const searchKeywords = generateSearchKeywords();
    const eventNameLower = eventName.toLowerCase();
    const sanitizedOptionalServices = Object.keys(
      eventData.optionalServices
    ).reduce((acc, service) => {
      acc[service] = false;
      return acc;
    }, {} as { [key: string]: boolean });

    let success = false;

    if (eventId) {
      // Editing existing event
      success = await updateEvent(eventId, {
        ...eventData,
        optionalServices: sanitizedOptionalServices,
        eventNameLower,
        searchKeywords,
        createdBy: activeUser.id,
      });
      toast.success(
        success ? "Event updated successfully!" : "Failed to update event."
      );
    } else {
      // Adding new event
      const newEventId = doc(collection(db, "events")).id;
      success = await addEvent({
        id: newEventId,
        ...eventData,
        optionalServices: sanitizedOptionalServices,
        eventNameLower,
        searchKeywords,
        createdBy: activeUser.id,
      });
      toast.success(
        success ? "Event added successfully!" : "Failed to add event."
      );

      // Only reset the form on success for new event
      if (success) {
        setEventData({
          eventName: "",
          eventTagline: "",
          eventDescription: "",
          slug: "",
          eventFormat: "",
          location: "",
          duration: "",
          teamSize: "",
          eventCategory: "",
          expectedOutcome: "",
          agendas: [],
          servicesIncluded: [],
          servicesNotIncluded: [],
          optionalServices: {},
        });
      }
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);

      // Delete the event
      await deleteDoc(doc(db, "events", id));

      // Get all bookings with the matching eventId
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("eventId", "==", id));
      const querySnapshot = await getDocs(q);

      // Batch delete all matching bookings
      const batch = writeBatch(db);
      querySnapshot.forEach((docSnap) => {
        batch.delete(doc(db, "bookings", docSnap.id));
      });

      await batch.commit();

      toast.success("Event and its bookings deleted successfully.");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete event and bookings.");
    } finally {
      setLoading(false);
    }
  };

  return {
    eventData,
    loading,
    message,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleDelete,
    setEventData,
  };
};
