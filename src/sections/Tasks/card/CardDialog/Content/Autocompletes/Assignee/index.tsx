import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import AssigneeAutocomplete from "@/sections/_Autocompletes/Assignee";
import { useAllUsersQuery } from "@/services/user";
import { useCallback, useMemo } from "react";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";

const useUpdateGoogleUserKey = () => {
    const { setValue } = useFormContext<ICreateOrUpdateTaskReq>();

    const { data } = useAllUsersQuery();
    const users = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const cb = useCallback(
        (ppUserId: number) => {
            const key = users.find(({ id }) => id === ppUserId)?.workspaceEmail;
            setValue("googleUserKey", key, { shouldDirty: true });
        },
        [users]
    );

    return cb;
};

const RHFAssignee = () => {
    const { t } = useTranslation();

    const { control } = useFormContext<ICreateOrUpdateTaskReq>();

    const updateKey = useUpdateGoogleUserKey();

    return (
        <Controller
            name="userIds"
            control={control}
            render={({
                field: { value, onChange, ...field },
                fieldState: { error },
            }) => (
                <AssigneeAutocomplete
                    label={t("Assignee")}
                    // INFO: make sure we store in array format
                    value={value?.[0] ?? -1}
                    onChange={(ids) => {
                        updateKey(ids);
                        onChange([ids ?? -1]);
                    }}
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
