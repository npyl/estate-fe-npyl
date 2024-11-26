import ClearableSection, {
    ClearableSectionProps,
} from "@/components/Filters/ClearableSection";
import { KeyValue } from "@/types/KeyValue";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CounterChip from "../OptionCheckbox/CounterChip";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { TOptionMapper } from "../OptionCheckbox/types";

type ToggleType = ActionCreatorWithPayload<any, string>;
type SelectorType = ({ filters }: RootState) => string[];

const mapper: TOptionMapper = (optionKey, counters) =>
    (counters?.[optionKey.toLowerCase()] as number) || 0;

// -----------------------------------------------------------------------------

interface OptionProps {
    o: KeyValue;
    toggle: ToggleType;
    selector: SelectorType;
}

const Option: FC<OptionProps> = ({ o: { key, value }, selector, toggle }) => {
    const dispatch = useDispatch();

    const { counters } = useFilterCounters();

    const values = useSelector(selector) || [];
    const isChecked = values.includes(key);
    const isDisabled = mapper(key, counters) === 0;

    const handleToggle = () => dispatch(toggle(key));

    return (
        <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            direction="row"
            alignItems="center"
            gap={1}
        >
            <FormControlLabel
                control={<Checkbox />}
                disabled={isDisabled}
                checked={isChecked}
                label={value}
                onChange={handleToggle}
            />

            <CounterChip optionKey={key} mapper={mapper} />
        </Grid>
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

const Section: FC<Props> = ({ options, selector, toggle, ...props }) => (
    <ClearableSection {...props}>
        <Grid container>{options.map(getOption(selector, toggle))}</Grid>
    </ClearableSection>
);

export default Section;
