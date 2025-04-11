import { useState } from "react";

type MultiTextInputProps = {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
  };
  
  export const MultiTextInput: React.FC<MultiTextInputProps> = ({ label, values, onChange }) => {
    const [input, setInput] = useState("");
  
    const handleAdd = () => {
      if (input.trim() !== "" && !values.includes(input.trim())) {
        onChange([...values, input.trim()]);
        setInput("");
      }
    };
  
    const handleRemove = (index: number) => {
      const updated = [...values];
      updated.splice(index, 1);
      onChange(updated);
    };
  
    return (
      <div className="mb-4">
        <label className="block font-medium mb-1">{label}</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((val, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {val}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };
  