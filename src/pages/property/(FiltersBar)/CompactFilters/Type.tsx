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

    return (
        <Grid xs={6} sm={4}>
            <FormControlLabel
                control={<Checkbox />}
                checked={isChecked}
                label={value}
                onChange={handleChange}
            />
        </Grid>
    );
};

// -----------------------------------------------------------------

const getOption = (o: KeyValue) => <Option key={o.key} option={o} />;

// -----------------------------------------------------------------

const Basic = () => {
    const { t } = useTranslation();

    const data = useGlobals();

    const stateEnum = data?.property?.state || [];

    return (
        <ClearableSection title={t("Type")} reset={resetStates}>
            <Grid container>{stateEnum.map(getOption)}</Grid>
        </ClearableSection>
    );
};

export default Basic;
