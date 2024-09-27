import {
    resetCategories,
    selectSubCategories,
    setSubCategories,
} from "@/slices/filters";
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
import { Typography } from "@mui/material";

// -----------------------------------------------------------------

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const dispatch = useDispatch();

    const categories = useSelector(selectSubCategories) || [];
    const isChecked = categories.includes(key);

    const handleChange = () => {
        // toggle
        const newCategories = categories.includes(key)
            ? categories.filter((s) => s !== key)
            : [...categories, key];
        // update slice
        dispatch(setSubCategories(newCategories));
    };

    return (
        <FormControlLabel
            control={<Checkbox />}
            checked={isChecked}
            label={value}
            onChange={handleChange}
        />
    );
};

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
