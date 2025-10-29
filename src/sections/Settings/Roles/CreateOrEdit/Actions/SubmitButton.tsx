import { useCreateOrUpdateRoleMutation } from "@/services/roles";
import { RoleReq } from "@/types/roles";
import { LoadingButton } from "@mui/lab";
import { useCallback, MouseEvent, FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
    isCreate: boolean;
}

const SubmitButton: FC<Props> = ({ isCreate }) => {
    const { t } = useTranslation();

    const [createOrUpdate, { isLoading }] = useCreateOrUpdateRoleMutation();

    const methods = useFormContext<RoleReq>();
    const handleSubmit = useCallback(async (d: RoleReq) => {
        await createOrUpdate(d);
    }, []);
    const onSubmit = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            return methods.handleSubmit(handleSubmit)(e);
        },
        [methods.handleSubmit]
    );

    const label = isCreate ? t("Create") : t("Update");

    if (!methods.formState.isDirty) return null;

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            // ...
            fullWidth={false}
            variant="contained"
            onClick={onSubmit}
        >
            {label}
        </LoadingButton>
    );
};

export default SubmitButton;
