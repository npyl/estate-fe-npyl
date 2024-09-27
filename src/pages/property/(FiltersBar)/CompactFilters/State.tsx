import { resetStates, selectStates, setStates } from "@/slices/filters";
import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "@/hooks/useGlobals";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { KeyValue } from "@/types/KeyValue";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Chip, ChipProps, Skeleton } from "@mui/material";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import { IPropertyFilterCounters } from "@/types/properties";

interface CounterChipProps extends ChipProps {
    // TODO: IpropertyFilter's keys -> should be the same as IPropertyFilterCounters' keys...
    filterKey: keyof IPropertyFilterCounters;
}

const CounterChip: FC<CounterChipProps> = ({ filterKey, ...props }) => {
    const { counters, isCountersLoading } = useFilterCounters();

    const label = counters?.[filterKey]?.toString() || "0";

    if (isCountersLoading) return <Skeleton />;

    return <Chip label={label} variant="outlined" size="small" {...props} />;
};

// -----------------------------------------------------------------

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const dispatch = useDispatch();

    const states = useSelector(selectStates) || [];
    const isChecked = states.includes(key);

    const handleChange = () => {
        // toggle
        const newStates = states.includes(key)
            ? states.filter((s) => s !== key)
            : [...states, key];
        // update slice
        dispatch(setStates(newStates));
    };

    const { counters } = useFilterCounters();
    const isDisabled = counters?.[key as keyof IPropertyFilterCounters] === 0;

    return (
        <Grid item xs={6} sm={4} display="flex" alignItems="center" pr={1}>
            <FormControlLabel
                control={<Checkbox />}
                disabled={isDisabled}
                checked={isChecked}
                label={value}
                onChange={handleChange}
            />

            <CounterChip filterKey={key as any} disabled={isDisabled} />
        </Grid>
    );
};

// -----------------------------------------------------------------

const getOption = (o: KeyValue) => <Option key={o.key} option={o} />;

// -----------------------------------------------------------------

const State = () => {
    const { t } = useTranslation();

    const data = useGlobals();

    const stateEnum = data?.property?.state || [];

    return (
        <ClearableSection title={t("State")} reset={resetStates}>
            <Grid container>{stateEnum.map(getOption)}</Grid>
        </ClearableSection>
    );
};

export default State;
