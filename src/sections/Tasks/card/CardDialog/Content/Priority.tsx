import PriorityGroup from "@/sections/Tasks/PriorityGroup";
import { Controller, useFormContext } from "react-hook-form";

const Priority = () => {
    const { control } = useFormContext();

    return (
        <Controller
            name="priority"
            control={control}
            render={({ field: { onChange, ...field } }) => (
                <PriorityGroup onChange={(_, v) => onChange(v)} {...field} />
            )}
        />
    );
};

export default Priority;
