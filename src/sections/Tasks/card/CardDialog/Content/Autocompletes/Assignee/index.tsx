import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import AssigneeAutocomplete from "@/ui/Autocompletes/Assignee";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";

const RHFAssignee = () => {
    const { t } = useTranslation();

    const { control } = useFormContext<ICreateOrUpdateTaskReq>();

    return (
        <Controller
            name="userIds"
            control={control}
            render={({
                field: { value, onChange, ...field },
                fieldState: { error },
            }) => (
                <AssigneeAutocomplete
                    assignToMe
                    label={t("Assignee")}
                    // INFO: make sure we store in array format
                    value={value?.[0] ?? -1}
                    onChange={(ids) => onChange([ids ?? -1])}
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
