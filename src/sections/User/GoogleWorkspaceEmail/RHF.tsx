import { Controller, useFormContext } from "react-hook-form";
import Autocomplete from "./Autocomplete";

const workspaceEmailKey = "workspaceEmail";

const RHFAutocomplete = () => {
    const { control } = useFormContext();
    return (
        <Controller
            name={workspaceEmailKey}
            control={control}
            render={({
                field: { onChange, ...field },
                fieldState: { error },
            }) => (
                <Autocomplete
                    label="Google Workspace Email"
                    {...field}
                    onChange={(_, v) => onChange(v?.id)}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default RHFAutocomplete;
