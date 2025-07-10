import React from "react";

type FieldType = "text" | "textarea" | "select";

export interface ConfigField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  options?: string[];
}

interface RenderFormProps {
  fields: ConfigField[];
  formData: Record<string, any>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RenderForm: React.FC<RenderFormProps> = ({
  fields,
  formData,
  onChange,
  onSelectChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => {
        const commonProps = {
          name: field.name,
          value: formData[field.name] ?? "",
          onChange: field.type === "select" ? onSelectChange : onChange,
          required: field.required,
          readOnly: field.readOnly,
          placeholder: field.placeholder,
          className: "p-3 border rounded w-full",
        };
        
        return (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium mb-1"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea {...(commonProps as any)} rows={3} />
            ) : field.type === "select" && field.options ? (
              <select {...(commonProps as any)}>
                <option value="">Select {field.label}</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input type={field.type} {...(commonProps as any)} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RenderForm;
