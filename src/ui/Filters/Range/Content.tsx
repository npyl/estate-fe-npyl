import { Grid, List, ListItemText } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListItem } from "@/components/Filters/styled";
import DebouncedInput from "./DebouncedInput";
import { Props } from "./types";
import formatNumber from "./formatNumber";

const Content: FC<Props> = ({
    type,
    valueMin,
    valueMax,
    setMin,
    setMax,
    generateNumbers,
}) => {
    const { t } = useTranslation();

    const symbol = type === "price" ? "€" : "m²";

    const [options] = useState(generateNumbers());

    const MAX_OPTION = (options?.at(-1) ?? 10000).toString();

    return (
        <Grid container p={1} spacing={3} sx={{ textWrap: "nowrap" }}>
            <Grid item xs={12} sm={6}>
                <DebouncedInput
                    label={`${symbol} ${t("from")}`}
                    max={MAX_OPTION}
                    setter={setMin}
                    value={valueMin}
                />

                <List
                    sx={{
                        maxHeight: 300,
                        overflowY: "scroll",
                    }}
                >
                    <ListItem onClick={() => setMin(undefined)}>
                        <ListItemText primary={t("Indifferent")} />
                    </ListItem>
                    {options.map((option) => (
                        <ListItem
                            key={option}
                            onClick={() =>
                                valueMax && option > valueMax && valueMax !== 0
                                    ? setMax(option)
                                    : setMin(option)
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
                    value={valueMax}
                />

                <List
                    sx={{
                        maxHeight: 300,
                        overflowY: "scroll",
                    }}
                >
                    <ListItem onClick={() => setMax(undefined)}>
                        <ListItemText primary={t("Indifferent")} />
                    </ListItem>
                    {options.map((option) => (
                        <ListItem
                            key={option}
                            onClick={() =>
                                valueMin && option < valueMin
                                    ? setMin(option)
                                    : setMax(option)
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
