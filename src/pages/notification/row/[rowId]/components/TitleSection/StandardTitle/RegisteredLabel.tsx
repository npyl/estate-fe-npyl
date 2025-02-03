import { useTranslation } from "react-i18next";
import SoftTypography from "@/components/SoftLabel";

const RegisteredLabel = () => {
    const { t } = useTranslation();
    return (
        <SoftTypography p={1} borderRadius={1} color="info">
            {t("Registered")}
        </SoftTypography>
    );
};

export default RegisteredLabel;
