import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import { IPropertyFilterExtras } from "@/types/properties";
import { useCallback, useMemo } from "react";
import ChipLabel from "./ChipLabel";
import {
    useExtras,
    useFiltersContext,
} from "@/sections/Properties/FiltersContext";

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

    const extras = useExtras();

    const value = useMemo(
        () =>
            Object.entries(extras)
                .filter(([_, value]) => value)
                .map(([key]) => t(lifestyleLabels[key as LifestyleKeys]))
                .join(", "),
        [t, extras]
    );

    const { resetExtras } = useFiltersContext();
    const handleDelete = useCallback(() => resetExtras(), []);

    return (
        <Chip
            label={<ChipLabel title="Lifestyle" value={value} />}
            onDelete={handleDelete}
        />
    );
};

export default LifestyleChip;
