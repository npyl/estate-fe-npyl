import { useTranslation } from "react-i18next";
import { useGeneratePDFMutation } from "@/services/properties";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback } from "react";

const GenerateButton = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { t } = useTranslation();

    const [generate, { isLoading }] = useGeneratePDFMutation();

    const handleGenerate = useCallback(
        () => generate(+propertyId!),
        [propertyId]
    );

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            onClick={handleGenerate}
        >
            {t("Generate")}
        </LoadingButton>
    );
};

export default GenerateButton;
