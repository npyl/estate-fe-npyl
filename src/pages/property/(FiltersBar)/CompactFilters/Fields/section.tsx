import ClearableSection, {
    ClearableSectionProps,
} from "@/components/Filters/ClearableSection";
import { KeyValue } from "@/types/KeyValue";
import Stack from "@mui/material/Stack";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CounterChip from "../OptionCheckbox/CounterChip";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import { IPropertyFilterCounters } from "@/types/properties";

type ToggleType = ActionCreatorWithPayload<any, string>;
type SelectorType = ({ filters }: RootState) => string[];

// -----------------------------------------------------------------------------

interface OptionProps {
    o: KeyValue;
    toggle: ToggleType;
    selector: SelectorType;
}

const Option: FC<OptionProps> = ({ o: { key, value }, selector, toggle }) => {
    const { counters } = useFilterCounters();

    const values = useSelector(selector) || [];
    const isChecked = values.includes(key);
    const isDisabled = counters?.[key as keyof IPropertyFilterCounters] === 0;

    return (
        <Stack direction="row" spacing={1}>
            <FormControlLabel
                control={<Checkbox />}
                disabled={isDisabled}
                checked={isChecked}
                label={value}
                onChange={toggle}
            />

            <CounterChip filterKey={key as any} />
        </Stack>
    );
};

// ------------------------------------------------------------------------------

const getOption =
    (selector: SelectorType, toggle: ToggleType) => (o: KeyValue) =>
        <Option key={o.key} o={o} toggle={toggle} selector={selector} />;

// ------------------------------------------------------------------------------

interface Props extends ClearableSectionProps {
    options: KeyValue[];
    selector: SelectorType;
    toggle: ToggleType;
}

const Section: FC<Props> = ({ options, toggle, selector, ...props }) => (
    <ClearableSection {...props}>
        {options.map(getOption(selector, toggle))}
    </ClearableSection>
);

export default Section;
