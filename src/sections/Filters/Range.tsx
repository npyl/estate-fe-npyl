import { FormControl, InputLabel, Select } from "@mui/material";
import { Grid, List, ListItemText } from "@mui/material";
import { FC, useMemo } from "react";
import { RootState, useDispatch, useSelector } from "src/store";
import { useTranslation } from "react-i18next";
import { ListItem } from "@/components/Filters/styled";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import DebouncedInput from "./DebouncedInput";

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

    const options = useMemo(() => generateNumbers(type), [type]);

    return (
        <Grid container p={1} spacing={3} sx={{ textWrap: "nowrap" }}>
            <Grid item xs={12} sm={6}>
                <DebouncedInput
                    label={`${symbol} ${t("from")}`}
                    setter={setMin}
                    selector={selectMin}
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
                <DebouncedInput
                    label={`${symbol} ${t("to")}`}
                    setter={setMax}
                    selector={selectMax}
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
    const { type, selectMin, selectMax } = props;

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
