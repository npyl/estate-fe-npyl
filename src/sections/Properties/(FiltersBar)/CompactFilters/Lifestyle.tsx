import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ClearableSection from "@/components/Filters/ClearableSection";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useFilterCounters from "@/sections/Properties/hooks/useFilterCounters";
import { IPropertyFilterExtras } from "@/types/properties";
import { FC, useCallback } from "react";
import CounterChip from "./OptionCheckbox/CounterChip";
import { TOptionMapper } from "./OptionCheckbox/types";
import { useExtras, useFiltersContext } from "../../FiltersContext";

interface IOption {
    key: keyof IPropertyFilterExtras;
    label: string;
    value: string;
}

const lifestyleOptions: IOption[] = [
    { key: "student", label: "Student", value: "student" },
    { key: "seaFront", label: "Seafront", value: "sea_front" },
    { key: "luxury", label: "Luxury Homes", value: "luxury" },
    { key: "mountainView", label: "Mountain View", value: "mountain_view" },
    {
        key: "neoclassical",
        label: "Historic/Neoclassical",
        value: "neoclassical",
    },
    { key: "investment", label: "Investment", value: "investment" },
    { key: "goldenVisa", label: "Golden Visa", value: "golden_visa" },
];

const mapper: TOptionMapper = (optionKey, counters) =>
    (counters?.[optionKey.toLowerCase()] as number) || 0;

interface OptionProps {
    o: IOption;
}

const Option: FC<OptionProps> = ({ o: { key, label, value } }) => {
    const { t } = useTranslation();

    const { counters } = useFilterCounters();
    const count = counters?.[value] || 0;
    const isDisabled = count === 0;

    const extras = useExtras();
    const checked = extras[key];

    const { toggleLifestyleFilter } = useFiltersContext();
    const handleToggle = useCallback(() => toggleLifestyleFilter(key), []);

    return (
        <Grid item xs={6} sm={4} display="flex" alignItems="center" pr={1}>
            <FormControlLabel
                control={<Checkbox />}
                checked={checked}
                onChange={handleToggle}
                disabled={isDisabled}
                label={t(label)}
            />

            <CounterChip optionKey={value} mapper={mapper} />
        </Grid>
    );
};

// ------------------------------------------------------------------------

const getOption = (o: IOption) => <Option key={o.key} o={o} />;

// ------------------------------------------------------------------------

const Lifestyle = () => {
    const { t } = useTranslation();

    const { resetExtras } = useFiltersContext();

    return (
        <ClearableSection title={t("Lifestyle")} reset={resetExtras}>
            <Grid container>{lifestyleOptions.map(getOption)}</Grid>
        </ClearableSection>
    );
};

export default Lifestyle;
