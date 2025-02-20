import { useSelector, useDispatch } from "react-redux";
import { resetExtras, selectExtras } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import { IPropertyFilterExtras } from "@/types/properties";
import { useCallback, useMemo } from "react";
import ChipLabel from "./ChipLabel";

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

    const value = useMemo(
        () =>
            Object.entries(extras)
                .filter(([_, value]) => value)
                .map(([key]) => t(lifestyleLabels[key as LifestyleKeys]))
                .join(", "),
        [t, extras]
    );

    const handleDelete = useCallback(() => dispatch(resetExtras()), []);

    return (
        <Chip
            label={<ChipLabel title="Lifestyle" value={value} />}
            onDelete={handleDelete}
        />
    );
};

export default LifestyleChip;
