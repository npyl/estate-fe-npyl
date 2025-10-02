import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Content, {
    ContentProps,
    getInputTestId,
    getOptionTestId,
} from "./Content";
import Select from "@/components/Select";
import { formatThousands } from "@/utils/formatNumber";

const PRICE_CEILING = (1000 * 1000 * 1000).toString(); // 1B euros
const AREA_CEILING = (1000 * 1000).toString(); // 1M m^2

interface RangeSelectProps extends Omit<ContentProps, "symbol" | "ceiling"> {
    type: "price" | "area";
    open?: boolean; // INFO: jest
}

const RangeSelect: FC<RangeSelectProps> = ({ type, open, ...props }) => {
    const { valueMin, valueMax } = props;

    const { t } = useTranslation();

    const symbol = type === "price" ? "€" : "m²";
    const label = type === "price" ? "Price" : "Area";
    const ceiling = type === "price" ? PRICE_CEILING : AREA_CEILING;

    // INFO: we have two lists of `MenuItem`s inside a single `Select`. Make sure we get a value that corresponds to a `MenuItem` (we don't care which) to prevent out-of-range warnings
    const value = useMemo(
        () => valueMax ?? valueMin ?? "",
        [valueMax, valueMin]
    );

    const renderValue = useCallback(() => {
        if (valueMin === undefined && valueMax === undefined) {
            return "";
        }
        if (valueMin && valueMax === undefined) {
            return t("From") + " " + formatThousands(valueMin) + symbol;
        }
        if (valueMin === undefined && valueMax) {
            return t("Until") + " " + formatThousands(valueMax) + symbol;
        }

        return (
            formatThousands(valueMin) + "-" + formatThousands(valueMax) + symbol
        );
    }, [valueMax, valueMin, t]);

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

export { getInputTestId, getOptionTestId, PRICE_CEILING };
export type { RangeSelectProps };
export default RangeSelect;
