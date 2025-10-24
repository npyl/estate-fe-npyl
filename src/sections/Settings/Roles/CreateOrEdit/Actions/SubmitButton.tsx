import { useCreateOrUpdateRoleMutation } from "@/services/roles";
import { RoleReq } from "@/types/roles";
import { LoadingButton } from "@mui/lab";
import { useCallback, MouseEvent } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SubmitButton = () => {
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

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            // ...
            fullWidth={false}
            variant="contained"
            onClick={onSubmit}
        >
            {t("Save")}
        </LoadingButton>
    );
};

export default SubmitButton;
