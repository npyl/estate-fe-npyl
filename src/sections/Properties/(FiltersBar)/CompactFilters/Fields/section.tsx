import ClearableSection, {
    ClearableSectionProps,
} from "@/components/Filters/ClearableSection";
import { KeyValue } from "@/types/KeyValue";
import { FC } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CounterChip from "../OptionCheckbox/CounterChip";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import Grid from "@mui/material/Grid";
import { TOptionMapper } from "../OptionCheckbox/types";
import { TToggleCb } from "./types";

const mapper: TOptionMapper = (optionKey, counters) =>
    (counters?.[optionKey.toLowerCase()] as number) || 0;

// -----------------------------------------------------------------------------

interface OptionProps {
    o: KeyValue;
    toggle: TToggleCb;
    values: string[];
}

const Option: FC<OptionProps> = ({ o: { key, value }, values, toggle }) => {
    const { counters } = useFilterCounters();

    const isChecked = values.includes(key);
    const isDisabled = mapper(key, counters) === 0;

    const handleToggle = () => toggle(key);

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

const getOption = (values: string[], toggle: TToggleCb) => (o: KeyValue) =>
    <Option key={o.key} o={o} toggle={toggle} values={values} />;

// ------------------------------------------------------------------------------

interface Props extends ClearableSectionProps {
    options: KeyValue[];
    values: string[];
    toggle: TToggleCb;
}

const Section: FC<Props> = ({ options, values, toggle, ...props }) => (
    <ClearableSection {...props}>
        <Grid container>{options.map(getOption(values, toggle))}</Grid>
    </ClearableSection>
);

export default Section;
