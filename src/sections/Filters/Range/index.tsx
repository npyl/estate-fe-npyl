import { FormControl, InputLabel, Select } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Content from "./Content";
import { Props } from "./types";
import formatNumber from "./formatNumber";

const PriceSelect: FC<Props> = (props) => {
    const { type, valueMin, valueMax } = props;

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

    const value = useMemo(() => {
        if (valueMin === 0 && valueMax === 0) {
            return "";
        }
        if (valueMin && valueMax === 0) {
            return t("From") + " " + formatNumber(valueMin) + symbol;
        }
        if (valueMin === 0 && valueMax) {
            return t("Until") + " " + formatNumber(valueMax) + symbol;
        }

        return formatNumber(valueMin) + "-" + formatNumber(valueMax) + symbol;
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

export default PriceSelect;
