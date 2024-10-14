import { FormControl, InputLabel, Select } from "@mui/material";
import { Grid, List, ListItemText, TextField } from "@mui/material";
import { FC, useMemo } from "react";
import { RootState, useDispatch, useSelector } from "src/store";
import { useTranslation } from "react-i18next";
import { ListItem } from "@/components/Filters/styled";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
    type: "price" | "area";

    selectMin: (s: RootState) => number | undefined;
    selectMax: (s: RootState) => number | undefined;
    setMin: ActionCreatorWithPayload<any, any>;
    setMax: ActionCreatorWithPayload<any, any>;

    generateNumbers: (type: "price" | "area") => number[];
}

const Content: FC<Props> = ({
    type,
    selectMin,
    selectMax,
    setMin,
    setMax,
    generateNumbers,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const symbol = type === "price" ? "€" : "m²";

    const valueMin = useSelector(selectMin) || 0;
    const valueMax = useSelector(selectMax) || 0;

    //Code for deleting the '0' in minValue textField when a number is typed
    const handleInputChangeMin = (event: any) => {
        let newValue = event.target.value;
        if (newValue === "" || isNaN(newValue)) {
            dispatch(setMin(""));
        } else {
            if (valueMin === 0) {
                newValue = newValue.slice(-1);
            }
            dispatch(setMin(newValue));
        }
    };

    //Code for deleting the '0' in maxValue textField when a number is typed
    const handleInputChangeMax = (event: any) => {
        let newValue = event.target.value;
        if (newValue === "" || isNaN(newValue)) {
            dispatch(setMax(""));
        } else {
            if (valueMax === 0) {
                newValue = newValue.slice(-1);
            }
            dispatch(setMax(newValue));
        }
    };

    const options = useMemo(() => generateNumbers(type), [type]);

    return (
        <Grid container p={1} spacing={3} sx={{ textWrap: "nowrap" }}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label={`${symbol} ${t("from")}`}
                    value={valueMin.toLocaleString("el-GR")}
                    onChange={handleInputChangeMin}
                />

                <List
                    sx={{
                        maxHeight: 300,
                        overflowY: "scroll",
                    }}
                >
                    <ListItem onClick={() => dispatch(setMin(undefined))}>
                        <ListItemText primary={t("Indifferent")} />
                    </ListItem>
                    {options.map((option) => (
                        <ListItem
                            key={option}
                            onClick={() =>
                                option > valueMax && valueMax !== 0
                                    ? dispatch(setMax(option))
                                    : dispatch(setMin(option))
                            }
                        >
                            <ListItemText primary={formatNumber(option)} />
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    label={`${symbol} ${t("to")}`}
                    value={valueMax.toLocaleString("el-GR")}
                    onChange={handleInputChangeMax}
                />
                <List
                    sx={{
                        maxHeight: 300,
                        overflowY: "scroll",
                    }}
                >
                    <ListItem onClick={() => dispatch(setMax(undefined))}>
                        <ListItemText primary={t("Indifferent")} />
                    </ListItem>
                    {options.map((option) => (
                        <ListItem
                            key={option}
                            onClick={() =>
                                option < valueMin
                                    ? dispatch(setMin(option))
                                    : dispatch(setMax(option))
                            }
                        >
                            <ListItemText primary={formatNumber(option)} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
};

const PriceSelect: FC<Props> = (props) => {
    const { type, selectMin, selectMax, setMin, setMax } = props;

    const { t } = useTranslation();

    const { symbol, label } = useMemo(
        () =>
            type === "price"
                ? {
                      symbol: "€",
                      label: "Price",
                  }
                : {
                      symbol: "m²",
                      label: "Area",
                  },
        [type]
    );

    const valueMin = useSelector(selectMin) || 0;
    const valueMax = useSelector(selectMax) || 0;

    const value = useMemo(() => {
        if (valueMin === 0 && valueMax === 0) {
            return "";
        }
        if (valueMin && valueMax === 0) {
            return t("From") + " " + formatNumber(+valueMin) + symbol;
        }
        if (valueMin === 0 && valueMax) {
            return t("Until") + " " + formatNumber(+valueMax) + symbol;
        }

        return formatNumber(+valueMin) + "-" + formatNumber(+valueMax) + symbol;
    }, [valueMax, valueMin, t]);

    return (
        <FormControl sx={{ minWidth: "135px", textWrap: "nowrap" }}>
            <InputLabel>{t(label)}</InputLabel>
            <Select
                label={t(label)}
                value={value}
                renderValue={(selected) => selected as string}
            >
                <Content {...props} />
            </Select>
        </FormControl>
    );
};

function formatNumber(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default PriceSelect;
