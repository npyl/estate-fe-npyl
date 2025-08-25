import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import { useTranslation } from "react-i18next";
const StayUpdated = () => {
    const { t } = useTranslation();
    return <RHFIOSSwitch label={t("Stay Updated")} name="enableEmails" />;
};
export default StayUpdated;
