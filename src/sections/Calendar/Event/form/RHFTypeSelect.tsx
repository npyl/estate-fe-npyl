import { useFormContext, useWatch } from "react-hook-form";
import TypeSelect from "../TypeSelect";
import { TCalendarEventType } from "@/components/Calendar/types";
import Stack from "@mui/material/Stack";

const RHFTypeSelect = () => {
    const { setValue } = useFormContext();

    const type = useWatch({ name: "type" });
    const handleChange = (t: TCalendarEventType) =>
        setValue("type", t, { shouldDirty: true });

    return (
        <Stack overflow="auto hidden">
            <TypeSelect type={type} onChange={handleChange} />
        </Stack>
    );
};

export default RHFTypeSelect;
