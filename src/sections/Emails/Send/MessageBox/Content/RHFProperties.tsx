import PropertyIdsPicker from "@/sections/Emails/Pickers/PropertyIds";
import { Controller, useFormContext } from "react-hook-form";
import { TMessageBoxValues } from "../types";

const RHFProperties = () => {
    const { control } = useFormContext<TMessageBoxValues>();
    return (
        <Controller
            control={control}
            name="propertyIds"
            render={({ field: { value, onChange } }) => (
                <PropertyIdsPicker propertyIds={value} onChange={onChange} />
            )}
        />
    );
};

export default RHFProperties;
