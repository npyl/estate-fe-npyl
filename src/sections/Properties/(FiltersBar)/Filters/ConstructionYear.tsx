import ClearableSection from "@/components/Filters/ClearableSection";
import Slider from "@mui/material/Slider";
import { useTranslation } from "react-i18next";
import {
    useFiltersContext,
    useMaxConstructionYear,
    useMinConstructionYear,
} from "../../FiltersContext";
import { useCallback } from "react";

const MIN_YEAR = 1960;
const MAX_YEAR = new Date().getFullYear();

const MARKS = [
    { value: 1960, label: "1960" },
    {
        value: new Date().getFullYear(),
        label: new Date().getFullYear().toString(),
    },
];

const ConstructionYear = () => {
    const { t } = useTranslation();

    const minYear = useMinConstructionYear() || 0;
    const maxYear = useMaxConstructionYear() || 0;

    const {
        setMinConstructionYear,
        setMaxConstructionYear,
        resetConstructionYear,
    } = useFiltersContext();

    const handleChange = useCallback((_: any, v: number | number[]) => {
        if (Array.isArray(v)) {
            setMinConstructionYear(v[0]);
            setMaxConstructionYear(v[1]);
        }
    }, []);

    return (
        <ClearableSection
            title={t("Construction Year")}
            reset={resetConstructionYear}
        >
            <Slider
                value={[minYear, maxYear]}
                onChange={handleChange}
                min={MIN_YEAR}
                max={MAX_YEAR}
                marks={MARKS}
                valueLabelDisplay="auto"
            />
        </ClearableSection>
    );
};

export default ConstructionYear;
