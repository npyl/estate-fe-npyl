import AssigneeAutocomplete from "./Autocomplete";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import { googleUserKey } from "./constants";

const AdminOnly = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name={googleUserKey}
            control={control}
            render={({
                field: { onChange, ...field },
                fieldState: { error },
            }) => (
                <AssigneeAutocomplete
                    label={t("Assignee")}
                    onChange={(_, v) => onChange(v?.workspaceEmail)}
                    {...field}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default AdminOnly;
