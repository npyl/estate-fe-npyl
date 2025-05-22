import { useTranslation } from "react-i18next";
import RHFCode from "@/ui/Autocompletes/RHFCode";

const RHFPropertyAutocomplete = () => {
    const { t } = useTranslation();
    return <RHFCode name="resourceId" label={t<string>("Property")} />;
};

export default RHFPropertyAutocomplete;
