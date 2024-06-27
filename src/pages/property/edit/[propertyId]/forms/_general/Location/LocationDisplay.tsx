import { RHFRadioGroup } from "@/components/hook-form";
import { LocationDisplay } from "@/types/enums";
import { TranslationType } from "@/types/translation";
import FormControl from "@mui/material/FormControl";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const getOPTIONS = (t: TranslationType) => [
    { label: t("Location not visible"), value: LocationDisplay.NOT_VISIBLE },
    { label: t("General location (circle)"), value: LocationDisplay.GENERAL },
    { label: t("Exact location (pin)"), value: LocationDisplay.EXACT },
];

const LocationDisplaySelect = () => {
    const { t } = useTranslation();

    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    return (
        <FormControl component="fieldset">
            <RHFRadioGroup name="location.locationDisplay" options={OPTIONS} />
        </FormControl>
    );
};

export default LocationDisplaySelect;
