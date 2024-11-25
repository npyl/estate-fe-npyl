import ClearableSection from "@/components/Filters/ClearableSection";
import {
    resetConstructionYear,
    selectMaxConstructionYear,
    selectMinConstructionYear,
    setMaxConstructionYear,
    setMinConstructionYear,
} from "@/slices/filters";
import Slider from "@mui/material/Slider";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

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

    const dispatch = useDispatch();

    const minYear = useSelector(selectMinConstructionYear) || 0;
    const maxYear = useSelector(selectMaxConstructionYear) || 0;

    const handleChange = (_: any, v: number | number[]) => {
        if (Array.isArray(v)) {
            dispatch(setMinConstructionYear(v[0]));
            dispatch(setMaxConstructionYear(v[1]));
        }
    };

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
