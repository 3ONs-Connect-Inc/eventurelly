type Agenda = {
    title: string;
    desc: string;
    time: string;
  };
  
  type AgendaInputProps = {
    agendas: Agenda[];
    onChange: (agendas: Agenda[]) => void;
  };
  
  export const AgendaInput: React.FC<AgendaInputProps> = ({ agendas, onChange }) => {
    const handleAgendaChange = (index: number, field: keyof Agenda, value: string) => {
      const updatedAgendas = [...agendas];
      updatedAgendas[index][field] = value;
      onChange(updatedAgendas);
    };
  
    const addAgenda = () => {
      onChange([...agendas, { title: "", desc: "", time: "" }]);
    };
  
    const removeAgenda = (index: number) => {
      const updatedAgendas = agendas.filter((_, i) => i !== index);
      onChange(updatedAgendas);
    };
  
    return (
      <div className="space-y-4">
        <h3 className="font-medium">Agendas</h3>
        {agendas.map((agenda, index) => (
          <div key={index} className="flex flex-col gap-2 border p-2 rounded">
            <input
              type="text"
              placeholder={`Agenda ${index + 1} Title`}
              value={agenda.title}
              onChange={(e) => handleAgendaChange(index, "title", e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder={`Agenda ${index + 1} Description`}
              value={agenda.desc}
              onChange={(e) => handleAgendaChange(index, "desc", e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 15 mins)"
              value={agenda.time}
              onChange={(e) => handleAgendaChange(index, "time", e.target.value)}
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeAgenda(index)}
              className="text-red-500 text-sm self-end"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAgenda}
          className="text-blue-600 text-sm"
        >
          + Add Agenda
        </button>
      </div>
    );
  };
  