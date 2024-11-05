import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import AssigneeAutocomplete from "./Autocomplete";

const RHFAssignee = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name="assigneeId"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <AssigneeAutocomplete
                    label={t("Assignee")}
                    {...field}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default RHFAssignee;
