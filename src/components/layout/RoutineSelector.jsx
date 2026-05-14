import { Select } from "@/components/ui/Select";
import { routineOrder, routines } from "@/data/routines";

export function RoutineSelector({ value, onChange, language, t }) {
  return (
    <Select label={t.selectRoutine} value={value} onChange={onChange}>
      {routineOrder.map((id) => (
        <option key={id} value={id}>{routines[id].label[language] || routines[id].label.en}</option>
      ))}
    </Select>
  );
}
