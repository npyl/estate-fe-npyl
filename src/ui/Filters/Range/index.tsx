import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Content from "./Content";
import { Props } from "./types";
import Select from "@/components/Select";
import { formatThousands } from "@/utils/formatNumber";

const PriceSelect: FC<Props> = (props) => {
    const { type, valueMin = 0, valueMax = 0 } = props;

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
            return t("From") + " " + formatThousands(valueMin) + symbol;
        }
        if (valueMin === 0 && valueMax) {
            return t("Until") + " " + formatThousands(valueMax) + symbol;
        }

        return (
            formatThousands(valueMin) + "-" + formatThousands(valueMax) + symbol
        );
    }, [valueMax, valueMin, t]);
    const renderValue = useCallback(() => value, [value]);

    return (
        <Select
            label={t(label)}
            value={value}
            renderValue={renderValue}
            formControlProps={{
                sx: {
                    minWidth: "175px",
                    maxWidth: "175px",
                    textWrap: "nowrap",
                },
            }}
        >
            <Content {...props} />
        </Select>
    );
};

export default PriceSelect;
