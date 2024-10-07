import { FormControl, InputLabel, Select } from "@mui/material";
import { Grid, List, ListItemText, TextField } from "@mui/material";
import { FC, useMemo } from "react";
import {
    selectMaxArea,
    selectMaxPrice,
    selectMinArea,
    selectMinPrice,
    selectStates,
    setMaxArea,
    setMaxPrice,
    setMinArea,
    setMinPrice,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { useTranslation } from "react-i18next";
import { ListItem } from "@/components/Filters/styled";

interface ContentProps {
    type: "price" | "area";
}

const Content: FC<ContentProps> = ({ type }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { setMinValue, setMaxValue, selectMinValue, selectMaxValue, symbol } =
        useMemo(
            () =>
                type === "price"
                    ? {
                          setMinValue: setMinPrice,
                          setMaxValue: setMaxPrice,
                          selectMinValue: selectMinPrice,
                          selectMaxValue: selectMaxPrice,
                          symbol: "€",
                      }
                    : {
                          setMinValue: setMinArea,
                          setMaxValue: setMaxArea,
                          selectMinValue: selectMinArea,
                          selectMaxValue: selectMaxArea,
                          symbol: "m²",
                      },
            [type]
        );

    const valueMin = useSelector(selectMinValue) || 0;
    const valueMax = useSelector(selectMaxValue) || 0;
    const states = useSelector(selectStates);

    //Code for deleting the '0' in minValue textField when a number is typed
    const handleInputChangeMin = (event: any) => {
        let newValue = event.target.value;
        if (newValue === "" || isNaN(newValue)) {
            dispatch(setMinValue(""));
        } else {
            if (valueMin === 0) {
                newValue = newValue.slice(-1);
            }
            dispatch(setMinValue(newValue));
        }
    };

    //Code for deleting the '0' in maxValue textField when a number is typed
    const handleInputChangeMax = (event: any) => {
        let newValue = event.target.value;
        if (newValue === "" || isNaN(newValue)) {
            dispatch(setMaxValue(""));
        } else {
            if (valueMax === 0) {
                newValue = newValue.slice(-1);
            }
            dispatch(setMaxValue(newValue));
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
                    <ListItem onClick={() => dispatch(setMinValue(undefined))}>
                        <ListItemText primary={t("Indifferent")} />
                    </ListItem>
                    {options.map((option) => (
                        <ListItem
                            key={option}
                            onClick={() =>
                                option > valueMax && valueMax !== 0
                                    ? dispatch(setMaxValue(option))
                                    : dispatch(setMinValue(option))
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
                    <ListItem onClick={() => dispatch(setMaxValue(undefined))}>
                        <ListItemText primary={t("Indifferent")} />
                    </ListItem>
                    {options.map((option) => (
                        <ListItem
                            key={option}
                            onClick={() =>
                                option < valueMin
                                    ? dispatch(setMinValue(option))
                                    : dispatch(setMaxValue(option))
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

interface Props {
    type: "price" | "area";
}

// TODO: different selectors/setters for customer/property!

const PriceSelect = ({ type }: Props) => {
    const { t } = useTranslation();

    const { selectMinValue, selectMaxValue, symbol, label } = useMemo(
        () =>
            type === "price"
                ? {
                      selectMinValue: selectMinPrice,
                      selectMaxValue: selectMaxPrice,
                      symbol: "€",
                      label: "Price",
                  }
                : {
                      selectMinValue: selectMinArea,
                      selectMaxValue: selectMaxArea,
                      symbol: "m²",
                      label: "Area",
                  },
        [type]
    );

    const valueMin = useSelector(selectMinValue) || 0;
    const valueMax = useSelector(selectMaxValue) || 0;

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
                <Content type={type} />
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
