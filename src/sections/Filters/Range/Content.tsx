import { Grid, List, ListItemText } from "@mui/material";
import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "src/store";
import { useTranslation } from "react-i18next";
import { ListItem } from "@/components/Filters/styled";
import DebouncedInput from "./DebouncedInput";
import { Props } from "./types";
import formatNumber from "./formatNumber";

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

    const MAX_OPTION = (options?.at(-1) ?? 10000).toString();

    return (
        <Grid container p={1} spacing={3} sx={{ textWrap: "nowrap" }}>
            <Grid item xs={12} sm={6}>
                <DebouncedInput
                    label={`${symbol} ${t("from")}`}
                    max={MAX_OPTION}
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
                    max={MAX_OPTION}
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

export default Content;
