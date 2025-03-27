import React, { useState } from "react";
import { addEvent } from "../../../firebase/admin/events/addEvent";
import { Event } from "../../../types";
import { collection, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { services } from "../../../../data";


const availableServices = [
    "Customizable escape room scenarios tailored to company goals",
    "Professional game hosts and facilitators",
    "All game materials and puzzles provided",
    "Pre-event consultation to align with team objectives",
    "Post-event debrief and feedback session",
    "Diversity training materials",
    "Interactive sessions",
    "Certificates of participation"
  ];

  const unAvailableServices = [
    "Venue rental (for in-person events)",
    "Catering or food & beverage",
    "Travel or accommodation expenses",
    "Additional branding/customization beyond standard options",
     "Venue and catering",
     "Travel expenses"
  ];

const AddEvent: React.FC = () => {
    const [eventData, setEventData] = useState<Omit<Event, "id">>({
    eventName: "",
    eventDescription: "",
    slug: "",
    eventFormat: "",
    location: "",
    duration: "",
    teamSize: "",
    servicesIncluded: [],
    servicesNotIncluded: [],
    optionalServices: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, key: keyof Event) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setEventData((prev) => ({ ...prev, [key]: selectedValues }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate required fields
    const { eventName, eventDescription, slug } = eventData;
    if (!eventName || !eventDescription || !slug) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Auto-generate event ID using Firestore
    const eventId = doc(collection(db, "events")).id;
    // Construct event object
    const newEvent: Event = {
      id: eventId,
      ...eventData,
    };

    const success = await addEvent(newEvent);
    if (success) {
      setMessage("Event added successfully!");
      setEventData({
        eventName: "",
        eventDescription: "",
        slug: "",
        eventFormat: "",
        location: "",
        duration: "",
        teamSize: "",
        servicesIncluded: [],
        servicesNotIncluded: [],
        optionalServices: [],
      });
    } else {
      setMessage("Failed to add event. Only admins can add events.");
    }
    setLoading(false);
  };


  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
      {message && <p className="mb-3 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
   
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={eventData.eventName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="eventDescription"
          placeholder="Event Description"
          value={eventData.eventDescription}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={eventData.slug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
          <input
          type="text"
          name="eventFormat"
          placeholder="Event Format"
          value={eventData.eventFormat}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
          <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
          <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={eventData.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
          <input
          type="text"
          name="teamSize"
          placeholder="Team Size"
          value={eventData.teamSize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div>
          <label className="block font-medium">Services Included</label>
          <select
            multiple
            name="servicesIncluded"
            value={eventData.servicesIncluded}
            onChange={(e) => handleMultiSelectChange(e, "servicesIncluded")}
            className="w-full p-2 border rounded"
          >
            {availableServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Services Not Included</label>
          <select
            multiple
            name="servicesNotIncluded"
            value={eventData.servicesNotIncluded}
            onChange={(e) => handleMultiSelectChange(e, "servicesNotIncluded")}
            className="w-full p-2 border rounded"
          >
            {unAvailableServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Optional Services</label>
          <select
            multiple
            name="optionalServices"
            value={eventData.optionalServices}
            onChange={(e) => handleMultiSelectChange(e, "optionalServices")}
            className="w-full p-2 border rounded"
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
       
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
