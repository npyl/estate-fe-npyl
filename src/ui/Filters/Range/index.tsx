import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Content, { ContentProps, getOptionTestId } from "./Content";
import Select from "@/components/Select";
import { formatThousands } from "@/utils/formatNumber";

const PRICE_CEILING = (1000 * 1000 * 1000).toString(); // 1B euros
const AREA_CEILING = (1000 * 1000).toString(); // 1M m^2

interface RangeSelectProps extends Omit<ContentProps, "symbol" | "ceiling"> {
    type: "price" | "area";
    open?: boolean; // INFO: jest
}

const RangeSelect: FC<RangeSelectProps> = ({ type, open, ...props }) => {
    const { valueMin = 0, valueMax = 0 } = props;

    const { t } = useTranslation();

    const symbol = type === "price" ? "€" : "m²";
    const label = type === "price" ? "Price" : "Area";
    const ceiling = type === "price" ? PRICE_CEILING : AREA_CEILING;

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
            open={open}
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
            <Content symbol={symbol} ceiling={ceiling} {...props} />
        </Select>
    );
};

export { getOptionTestId };
export type { RangeSelectProps };
export default RangeSelect;
