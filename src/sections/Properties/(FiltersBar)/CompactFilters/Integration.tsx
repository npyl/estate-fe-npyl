import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import Grid from "@mui/material/Grid";
import { KeyValue } from "@/types/KeyValue";
import { FC } from "react";
import CounterChip from "./OptionCheckbox/CounterChip";
import OptionCheckbox from "./OptionCheckbox";
import { TOptionMapper } from "./OptionCheckbox/types";
import { useFiltersContext, useIntegrationSites } from "../../FiltersContext";
import { IntegrationSite } from "@/types/listings";

// -----------------------------------------------------------------

const mapper: TOptionMapper = (optionKey, counters) =>
    (counters?.[optionKey.toLowerCase()] as number) || 0;

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const values = useIntegrationSites();
    const { setIntegrationSites } = useFiltersContext();

    return (
        <Grid item xs={6} sm={4} display="flex" alignItems="center" pr={1}>
            <OptionCheckbox
                optionKey={key}
                label={value}
                values={values}
                setter={setIntegrationSites}
                mapper={mapper}
            />

            <CounterChip optionKey={key} mapper={mapper} />
        </Grid>
    );
};

// -----------------------------------------------------------------

const getOption = (o: KeyValue) => <Option key={o.key} option={o} />;

// -----------------------------------------------------------------

type TIntegrationOption = {
    key: IntegrationSite;
    value: string;
};

const INTEGRATION_SITES: TIntegrationOption[] = [
    { key: "SPITOGATOS", value: "spitogatos.gr" },
    { key: "PLOT_GR", value: "plot.gr" },
    { key: "JAMES_EDITION", value: "jamesedition.com" },
    { key: "XE", value: "xe.gr" },
    { key: "RIGHT_MOVE", value: "rightmove.co.uk" },
    { key: "FERIMMO", value: "ferimmo.de" },
];

const Integration = () => {
    const { t } = useTranslation();

    const { resetIntegrationSites } = useFiltersContext();

    return (
        <ClearableSection
            title={t("Integrations")}
            reset={resetIntegrationSites}
        >
            <Grid container>{INTEGRATION_SITES.map(getOption)}</Grid>
        </ClearableSection>
    );
};

export default Integration;
