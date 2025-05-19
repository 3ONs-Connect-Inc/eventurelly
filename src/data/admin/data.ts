import { filterOptions } from "../../../data";
import { ConfigField } from "../../components/Admin/ui/RenderForm";

export const addEventFormFields: ConfigField[] = [
  { type: "text", name: "eventName", placeholder: "Event Name", label: "Event Name", required: true },
  { type: "text", name: "eventTagline", placeholder: "Event Tag", label: "Event Tagline", required: true },
  { type: "textarea", name: "eventDescription",  placeholder: "Event Description", label: "Event Description", required: true },
  { type: "text", name: "slug", label: "Slug",  placeholder: "Slug", readOnly: true },
  { type: "text", name: "location",  placeholder: "Location",  label: "Location" },
  { type: "text", name: "duration",  placeholder: "Duration", label: "Duration" },
  ...Object.entries(filterOptions).map(
    ([label, options]) =>
      ({
        type: "select",
        name: label.replace(/\s+/g, ""),
        label,
        options,
      } as ConfigField)
  ),
];
