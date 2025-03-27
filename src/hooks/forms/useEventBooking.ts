import { useState } from "react";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { BookingData } from "../../types";
import { useAppDispatch, useAppSelector } from "../redux";
import { addBooking } from "../../redux/slices/eventBookingSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
  

export const useEventBooking = (eventId?: string, slug?: string) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<BookingData>({
    eventId: eventId || "", 
    slug: slug || "", 
    eventName: "",
    eventDate: null,
    optionalServices: [],
    eventDetail: "Diversity and Inclusion Workshop",
    eventDescription: "This event promotes awareness and actionable strategies to build a more inclusive work environment",
    eventFormat: "In Person",
    location: "Toronto, ON, CA",
    duration: "2 hours",
    teamSize: "4-5",
    servicesIncluded: ['Diversity training materials',
      'Interactive sessions', 
      'Certification of Participation'],
    servicesNotIncluded: ['Diversity training materials',
      'Interactive sessions'],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const activeUser = useAppSelector((state: RootState) => state.user.activeUser);


  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.eventName.trim()) {
      newErrors.eventName = "Event name is required.";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Date is required.";
    }

    if (formData.optionalServices.length === 0) {
      newErrors.optionalServices = "At least one optional service is required.";
    }

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
    setFormData((prev) => {
      const updatedServices = prev.optionalServices.includes(service)
        ? prev.optionalServices.filter((s) => s !== service)
        : [...prev.optionalServices, service];

      return { ...prev, optionalServices: updatedServices };
    });

    // Clear the error only after submit has been attempted
    if (isSubmitted && errors.optionalServices) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.optionalServices;
        return newErrors;
      });
    }
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
    dispatch(addBooking({ 
      ...formData,
      userId,  
      slug: slug,
      eventId: eventId,
      eventDate: formData.eventDate ? formData.eventDate.toISOString() : null }));
    setIsLoading(true);
    try {
        await addDoc(collection(db, "bookings"), {
          ...formData,
          userId,  
          slug: slug,
          eventId: eventId,
          eventDate: formData.eventDate ? formData.eventDate.toISOString() : null,
        });
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
