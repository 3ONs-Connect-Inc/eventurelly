import React, { useState, useEffect } from "react";
import { addEvent, updateEvent } from "../../../firebase/admin/events";
import { Event } from "../../../types";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { filterOptions} from "../../../../data";
import { MultiTextInput } from "../ui/MultiTextInput";
import { AgendaInput } from "../ui/AgendaInput";

const EventForm: React.FC<{ eventId?: string }> = ({ eventId }) => {
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
    optionalServices: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        const eventRef = doc(db, "events", eventId);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          setEventData(eventSnap.data() as Omit<Event, "id">);
        }
      };
      fetchEvent();
    }
  }, [eventId]);

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
    addKeyword(eventData.eventName);
    addKeyword(eventData.eventCategory);
    addKeyword(eventData.teamSize);
    addKeyword(eventData.eventFormat);
    addKeyword(eventData.expectedOutcome);
  
    return Array.from(keywords);
  };
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "eventName") {
        updated.slug = value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
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

    const { eventName, eventDescription, slug } = eventData;
    if (!eventName || !eventDescription || !slug) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const searchKeywords = generateSearchKeywords();
    const eventNameLower = eventName.toLowerCase();
    let success;

    if (eventId) {
      success = await updateEvent(eventId, {
        ...eventData,
        eventNameLower,
        searchKeywords,
      });
      setMessage(success ? "Event updated successfully!" : "Failed to update event.");
    } else {
      const newEventId = doc(collection(db, "events")).id;
      success = await addEvent({ id: newEventId, ...eventData,
        eventNameLower,  
        searchKeywords,
       });
      setMessage(success ? "Event added successfully!" : "Failed to add event.");
    }

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
        optionalServices: [],
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{eventId ? "Edit Event" : "Add New Event"}</h2>
      {message && <p className="mb-3 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="eventName" placeholder="Event Name" value={eventData.eventName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="eventTagline" placeholder="Event Tagline" value={eventData.eventTagline} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="eventDescription" placeholder="Event Description" value={eventData.eventDescription} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="slug"   readOnly placeholder="Slug" value={eventData.slug} onChange={handleChange} className="w-full p-2 border rounded" />
      
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="duration" placeholder="Duration" value={eventData.duration} onChange={handleChange} className="w-full p-2 border rounded" />
      
        {Object.entries(filterOptions).map(([label, options]) => {
  const fieldName = label.replace(/\s+/g, ""); 

  return (
    <div key={label}>
      <label className="block font-medium">{label}</label>
      <select 
        name={fieldName}   
        value={
          typeof eventData[fieldName as keyof Omit<Event, "id">] === "string"
            ? (eventData[fieldName as keyof Omit<Event, "id">] as string)
            : ""
        }
        onChange={handleSelectChange} 
        className="w-full p-2 border rounded"
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
})}

<AgendaInput
  agendas={eventData.agendas}
  onChange={(agendas) => setEventData((prev) => ({ ...prev, agendas }))}
/>
        
<MultiTextInput
  label="Services Included"
  values={eventData.servicesIncluded ?? []}
  onChange={(values) => setEventData((prev) => ({ ...prev, servicesIncluded: values }))}
/>

<MultiTextInput
  label="Services Not Included"
  values={eventData.servicesNotIncluded ?? []}
  onChange={(values) => setEventData((prev) => ({ ...prev, servicesNotIncluded: values }))}
/>


<MultiTextInput
  label="Optional Services"
  values={eventData.optionalServices ?? []}
  onChange={(values) => setEventData((prev) => ({ ...prev, optionalServices: values }))}
/>
        
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? (eventId ? "Updating..." : "Adding...") : (eventId ? "Update Event" : "Add Event")}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
