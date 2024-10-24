import { useFormContext } from "react-hook-form";
import TypeSelect from "../TypeSelect";
import { TCalendarEventType } from "@/components/Calendar/types";

const RHFTypeSelect = () => {
    const { watch, setValue } = useFormContext();
    const type = watch("type");
    const handleChange = (t: TCalendarEventType) =>
        setValue("type", t, { shouldDirty: true });
    return <TypeSelect type={type} onChange={handleChange} />;
};

export default RHFTypeSelect;
