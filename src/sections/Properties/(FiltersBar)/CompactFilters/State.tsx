import { resetStates, selectStates, setStates } from "@/slices/filters";
import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "@/hooks/useGlobals";
import Grid from "@mui/material/Grid";
import { KeyValue } from "@/types/KeyValue";
import { FC } from "react";
import CounterChip from "./OptionCheckbox/CounterChip";
import OptionCheckbox from "./OptionCheckbox";
import { TOptionMapper } from "./OptionCheckbox/types";

// -----------------------------------------------------------------

const mapper: TOptionMapper = (optionKey, counters) =>
    (counters?.[optionKey.toLowerCase()] as number) || 0;

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => (
    <Grid item xs={6} sm={4} display="flex" alignItems="center" pr={1}>
        <OptionCheckbox
            optionKey={key}
            label={value}
            selector={selectStates}
            setter={setStates}
            mapper={mapper}
        />

        <CounterChip optionKey={key} mapper={mapper} />
    </Grid>
);

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
