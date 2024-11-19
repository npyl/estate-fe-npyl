import { FC } from "react";
import AssigneeAutocomplete from "./Autocomplete";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import { googleUserKey } from "./constants";

interface Props {
    adminId?: number;
}

const AdminOnly: FC<Props> = ({ adminId }) => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name={googleUserKey}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <AssigneeAutocomplete
                    adminId={adminId}
                    label={t("Assignee")}
                    {...field}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default AdminOnly;
