import SoftTypography, { ColorType } from "@/components/SoftLabel";
import { useGetProperty } from "@/hooks/property";
import { LocationDisplay } from "@/types/enums";
import { TranslationType } from "@/types/translation";
import { useTranslation } from "react-i18next";

const getColor = (key: LocationDisplay): ColorType => {
    if (key === LocationDisplay.EXACT) {
        return "primary";
    }

    if (key === LocationDisplay.GENERAL) {
        return "warning";
    }

    return "error";
};

const getText = (t: TranslationType, key: LocationDisplay) =>
    t(`INFO_LOCATION_DISPLAY_${key}`);

const VisibilityStatus = () => {
    const { t } = useTranslation();
    const { property } = useGetProperty();

    const key = property?.location?.locationDisplay?.key as LocationDisplay;

    if (!key) return null;

    return (
        <SoftTypography mr={5} px={1} py={0.5} borderRadius={2} color={getColor(key)}>
            {getText(t, key)}
        </SoftTypography>
    );
};

export default VisibilityStatus;
