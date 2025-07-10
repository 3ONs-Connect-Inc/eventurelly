import React from "react";
import { useEventForm } from "../hooks/useEventForm";
import { MultiTextInput } from "../ui/MultiTextInput";
import { AgendaInput } from "../ui/AgendaInput";
import { useColor } from "../ui/useColor";
import RenderForm from "../ui/RenderForm";
import { Button } from "../ui/Button";
import { addEventFormFields } from "../../constants";
import CloudinaryUpload from "./CloudinaryUpload";


const EventForm: React.FC<{ eventId?: string }> = ({ eventId }) => {
  const {
    eventData,
    loading,
    message,
    handleChange,
    handleSelectChange,  
    handleSubmit,
    setEventData,
  } = useEventForm(eventId);
  const { bgColor } = useColor();

  return (
    <div className={` ${bgColor} card col-span-1 md:col-span-2 lg:col-span-3`}>
      <div className="card-header">
        {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
      </div>

      <form
        onSubmit={handleSubmit}
        className="card-body overflow-auto p-4 space-y-6"
      >
        {/* Event Name and Tagline */}

        <CloudinaryUpload
          onUploadSuccess={(url) =>
            setEventData((prev) => ({ ...prev, eventImage: url }))
          }
          label="Event Image"
          eventId={eventId}
            required={!eventId} 
          previousImageUrl={eventData.eventImage}
        />

        <RenderForm
          fields={addEventFormFields}
          formData={eventData}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />

        <AgendaInput
          agendas={eventData.agendas}
          onChange={(agendas) => setEventData((prev) => ({ ...prev, agendas }))}
        />

        <MultiTextInput
          label="Services Included"
          values={eventData.servicesIncluded ?? []}
          onChange={(values) =>
            setEventData((prev) => ({ ...prev, servicesIncluded: values }))
          }
        />

        <MultiTextInput
          label="Services Not Included"
          values={eventData.servicesNotIncluded ?? []}
          onChange={(values) =>
            setEventData((prev) => ({ ...prev, servicesNotIncluded: values }))
          }
        />

        <MultiTextInput
          label="Optional Services"
          values={Object.keys(eventData.optionalServices)} // Show keys (service names)
          onChange={(values: string[]) => {
            const updatedOptionalServices = values.reduce((acc, service) => {
              acc[service] = true; // Mark selected services as true
              return acc;
            }, {} as { [key: string]: boolean });
            setEventData((prev) => ({
              ...prev,
              optionalServices: updatedOptionalServices,
            }));
          }}
        />

        <Button
          aria-label="submit button"
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
        >
          {loading
            ? eventId
              ? "Updating..."
              : "Adding..."
            : eventId
            ? "Update Event"
            : "Add Event"}
        </Button>
      </form>
    </div>
  );
};

export default EventForm;
