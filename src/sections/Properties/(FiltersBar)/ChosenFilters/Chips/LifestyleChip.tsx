import { useSelector, useDispatch } from "react-redux";
import {
    deleteLifestyle,
    selectExtras,
    toggleLifestyleFilter,
} from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import ChipLabel from "./ChipLabel";
import { IPropertyFilterExtras } from "@/types/properties";

type LifestyleKeys = keyof IPropertyFilterExtras;

const lifestyleLabels: Record<LifestyleKeys, string> = {
    student: "Student",
    seaFront: "Seafront",
    luxury: "Luxury Homes",
    mountainView: "Mountain View",
    neoclassical: "Historic/Neoclassical",
    investment: "Investment",
    goldenVisa: "Golden Visa",
};

const LifestyleChip = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const extras = useSelector(selectExtras);

    // Get selected lifestyle filters
    const selectedLifestyle: LifestyleKeys[] = Object.entries(extras)
        .filter(([_, value]) => value)
        .map(([key]) => key as LifestyleKeys);

    return (
        <Stack direction="row" spacing={1} flexWrap="wrap">
            {selectedLifestyle.map((key) => (
                <Chip
                    key={key}
                    label={
                        <ChipLabel
                            title={t("Lifestyle")}
                            value={t(lifestyleLabels[key])}
                        />
                    }
                    onDelete={() => dispatch(deleteLifestyle(key))}
                />
            ))}
        </Stack>
    );
};

export default LifestyleChip;
