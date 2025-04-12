import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { BookingData } from "../../types";
import { useAppDispatch, useAppSelector } from "../redux";
import { addBooking } from "../../redux/slices/eventBookingSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useEventBooking = (
  eventId?: string,
  slug?: string,
  eventDetail?: any
) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<BookingData>({
    eventId: eventId || "",
    bookingId: eventDetail.bookingId || "",
    slug: slug || "",
    eventNamePrefix: "",
    eventDate: null,
    optionalServices:
    typeof eventDetail?.optionalServices === "object" &&
    !Array.isArray(eventDetail.optionalServices)
      ? eventDetail.optionalServices
      : Object.fromEntries(
          (eventDetail?.optionalServices ?? []).map((service: string) => [
            service,
            false,
          ])
        ),
    eventName: eventDetail.eventName,
    eventDescription: eventDetail.eventDescription,
    eventFormat: eventDetail.eventFormat,
    teamSize: eventDetail.teamSize,
    eventCategory: eventDetail.eventCategory,
    expectedOutcome: eventDetail.expectedOutcome,
    location: eventDetail.location,
    duration: eventDetail.duration,
    servicesIncluded: eventDetail.servicesIncluded,
    servicesNotIncluded: eventDetail.servicesNotIncluded,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const activeUser = useAppSelector(
    (state: RootState) => state.user.activeUser
  );

  useEffect(() => {
    if (eventDetail.isBooked) {
      setFormData((prev) => ({
        ...prev,
        bookingId: eventDetail.bookingId || prev.bookingId,
        eventNamePrefix: eventDetail.eventNamePrefix || "",
        eventDate: eventDetail.eventDate
          ? new Date(eventDetail.eventDate)
          : null,
        optionalServices: eventDetail.optionalServices || [],
        eventName: eventDetail.eventName || "",
        eventDescription: eventDetail.eventDescription || "",
        eventFormat: eventDetail.eventFormat || "",
        location: eventDetail.location || "",
        duration: eventDetail.duration || "",
        teamSize: eventDetail.teamSize || "",
        eventCategory: eventDetail.eventCategory || "",
        expectedOutcome: eventDetail.expectedOutcome || "",
        servicesIncluded: eventDetail.servicesIncluded || [],
        servicesNotIncluded: eventDetail.servicesNotIncluded || [],
      }));
    }
  }, [eventDetail]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // if (!formData.eventNamePrefix.trim()) {
    //   newErrors.eventNamePrefix = "Event name is required.";
    // }

    if (!formData.eventDate) {
      newErrors.eventDate = "Date is required.";
    }

    // if (formData.optionalServices.length === 0) {
    //   newErrors.optionalServices = "At least one optional service is required.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      eventDate: date,
    }));

    // Clear the eventDate error if it was previously set
    if (isSubmitted && errors.eventDate) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.eventDate;
        return newErrors;
      });
    }
  };

  const generateSearchKeywords = () => {
    const keywords = new Set<string>();

    const addKeyword = (text?: string) => {
      if (text && typeof text === "string") {
        keywords.add(text.toLowerCase());

        // Split words for better searchability
        const words = text.toLowerCase().split(" ");
        words.forEach((word) => {
          if (word.length > 2) {
            keywords.add(word);
          }
        });
      }
    };

    // Add searchable terms from event details
    addKeyword(formData.eventNamePrefix);
    addKeyword(formData.eventCategory);
    addKeyword(formData.teamSize);
    addKeyword(formData.eventFormat);
    addKeyword(formData.expectedOutcome);

    return Array.from(keywords);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error only after submit has been attempted
    if (isSubmitted && errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      optionalServices: {
        ...prev.optionalServices,
        [service]: !prev.optionalServices[service],
      },
    }));
  };
  
  

  const checkEventExists = async (): Promise<boolean> => {
    const q = query(
      collection(db, "bookings"),
      where("eventNamePrefix", "==", formData.eventNamePrefix),
      where(
        "eventDate",
        "==",
        formData.eventDate ? formData.eventDate.toISOString() : null
      )
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) return;
    const userId = activeUser?.id;

    if (!userId) {
      navigate("/sign-in");
      return;
    }

    const searchKeywords = generateSearchKeywords();
    const eventNamePrefixLower = formData.eventNamePrefix.toLowerCase();

    dispatch(
      addBooking({
        ...formData,
        userId,
        slug: slug,
        eventId: eventId,
        eventDate: formData.eventDate ? formData.eventDate.toISOString() : null,
      })
    );
    setIsLoading(true);
    try {
      if (formData.bookingId && formData.bookingId !== "") {
        console.log("Updating booking:", formData.bookingId);
        // **Update Existing Booking**
        const bookingRef = doc(db, "bookings", formData.bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (!bookingSnap.exists()) {
          console.error("Error: No booking found to update.");
          return;
        }

        if (bookingSnap.data().userId !== userId) {
          toast.error(
            "Permission denied: You are not the owner of this booking."
          );
          setIsLoading(false);
          setIsSubmitted(false);
          return;
        }

        await updateDoc(bookingRef, {
          ...formData,
          eventDate: formData.eventDate
            ? formData.eventDate.toISOString()
            : null,
          eventNamePrefixLower,
          searchKeywords,
        });
      } else {
        const eventExists = await checkEventExists();
        if (eventExists) {
          setErrors((prev) => ({
            ...prev,
            eventNamePrefix: "This event already exists on the selected date.",
          }));
          setIsLoading(false);
          return;
        }
        console.log("Creating a new booking...");
        // Create new booking
        const newBookingRef = await addDoc(collection(db, "bookings"), {
          ...formData,
          userId,
          slug: slug,
          eventId: eventId,
          eventDate: formData.eventDate
            ? formData.eventDate.toISOString()
            : null,
          searchKeywords,
          isBooked: true,
          eventNamePrefixLower,
        });
        console.log("New Booking Created:", newBookingRef.id); // Debugging
        await updateDoc(newBookingRef, {
          bookingId: newBookingRef.id,
        });

        setFormData((prev) => ({
          ...prev,
          bookingId: newBookingRef.id, // Ensure bookingId is stored
        }));
      }
      setIsSuccess(true);
      setIsSubmitted(false);
    } catch (error) {
      console.error("Error saving booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors: isSubmitted ? errors : {},
    isSuccess,
    isLoading,
    handleChange,
    handleDateChange,
    handleCheckboxChange,
    handleSubmit,
    setIsSuccess,
  };
};
