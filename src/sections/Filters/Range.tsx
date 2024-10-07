import { FormControl, InputLabel, Select } from "@mui/material";
import { Grid, List, ListItemText, TextField } from "@mui/material";
import { FC, useMemo } from "react";
import { selectStates } from "src/slices/filters";
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
}

const Content: FC<Props> = ({ type, selectMin, selectMax, setMin, setMax }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const symbol = type === "price" ? "€" : "m²";

    const valueMin = useSelector(selectMin) || 0;
    const valueMax = useSelector(selectMax) || 0;
    const states = useSelector(selectStates);

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

    const options = useMemo(
        () => generateNumbers(states, type),
        [states, type]
    );

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

// TODO: different selectors/setters for customer/property!

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
function generateNumbers(states: string[], type: string) {
    const numbers = [];

    const FIVE_K = 5000;
    const TEN_M = 10 * 1000 * 1000;
    const FIFTY = 50;
    const HUNDRED_K = 100 * 1000;

    if (type === "price") {
        if (states.includes("RENT") || states.includes("RENTED")) {
            for (let i = 0; i <= FIVE_K; i += FIFTY) {
                numbers.push(i);
            }
        } else {
            for (let i = 0; i <= TEN_M; i += HUNDRED_K) {
                numbers.push(i);
            }
        }
    } else {
        for (let i = 10; i <= 1000; i += 10) {
            numbers.push(i);
        }
    }

    return numbers;
}
export default PriceSelect;
