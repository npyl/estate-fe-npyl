import { useAddPublicSiteMutation } from "@/services/company";
import { IPublicSiteReq } from "@/types/company";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SubmitButton = () => {
    const { t } = useTranslation();

    const methods = useFormContext<IPublicSiteReq>();

    const [addPublic, { isLoading }] = useAddPublicSiteMutation();

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            onClick={methods.handleSubmit(addPublic)}
            sx={{
                width: "fit-content",
                alignSelf: "flex-end",
            }}
        >
            {t("Add")}
        </LoadingButton>
    );
};

export default SubmitButton;
