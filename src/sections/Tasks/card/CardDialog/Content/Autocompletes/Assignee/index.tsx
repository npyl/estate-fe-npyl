import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import AssigneeAutocomplete from "./Autocomplete";

const RHFAssignee = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name="assignees"
            control={control}
            render={({
                field: { value, onChange, ...field },
                fieldState: { error },
            }) => (
                <AssigneeAutocomplete
                    label={t("Assignee")}
                    // INFO: make sure we store in array format
                    value={value?.[0] ?? -1}
                    onChange={(ids) => onChange((ids as number[])?.[0] ?? -1)}
                    // ...
                    {...field}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default RHFAssignee;
