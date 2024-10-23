import {
    resetCategories,
    selectSubCategories,
    setSubCategories,
} from "@/slices/filters";
import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "@/hooks/useGlobals";
import Grid from "@mui/material/Grid";
import { KeyValue } from "@/types/KeyValue";
import { FC } from "react";
import { Stack, Typography } from "@mui/material";
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
    <Stack direction="row" alignItems="center">
        <OptionCheckbox
            optionKey={key}
            label={value}
            selector={selectSubCategories}
            setter={setSubCategories}
            mapper={mapper}
        />

        <CounterChip optionKey={key} mapper={mapper} />
    </Stack>
);

// -----------------------------------------------------------------

const getOption = (o: KeyValue) => <Option key={o.key} option={o} />;

// -----------------------------------------------------------------

interface ColumnProps {
    title: string;
    options: KeyValue[];
}

const Column: FC<ColumnProps> = ({ title, options }) => (
    <Grid item xs={6} sm={4} display="flex" flexDirection="column">
        <Typography>{title}</Typography>
        {options.map(getOption)}
    </Grid>
);

// -----------------------------------------------------------------

const Category = () => {
    const { t } = useTranslation();
    const data = useGlobals();
    const residentialEnum = data?.property?.residentialCategory || [];
    const commercialEnum = data?.property?.commercialCategory || [];
    const landEnum = data?.property?.landCategory || [];
    const otherEnum = data?.property?.otherCategory || [];

    return (
        <ClearableSection title={t("Category")} reset={resetCategories}>
            <Grid container>
                <Column title={t("Residential")} options={residentialEnum} />
                <Column title={t("Commercial")} options={commercialEnum} />
                <Column title={t("Land")} options={landEnum} />
                <Column title={t("Other")} options={otherEnum} />
            </Grid>
        </ClearableSection>
    );
};

export default Category;
