import { MenuItem, Stack, SxProps, Theme } from "@mui/material";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import DebouncedInput, { DebouncedInputRef } from "./DebouncedInput";
import { formatThousands } from "@/utils/formatNumber";

const PRICE_CEILING = (1000 * 1000 * 1000).toString(); // 1B euros
const AREA_CEILING = (1000 * 1000).toString(); // 1M m^2

const OptionContainerSx: SxProps<Theme> = {
    maxHeight: 300,
    overflowY: "auto",
};

const getOption =
    (value: number | undefined, onClick: (o: string) => void) =>
    (o: number) => (
        <MenuItem
            key={o}
            onClick={() => onClick(o.toString())}
            selected={value === o}
        >
            {formatThousands(o)}
        </MenuItem>
    );

interface PaneRef extends DebouncedInputRef {}

interface PaneProps {
    label: "from" | "to";
    type: "price" | "area";
    options: number[];

    value?: number;
    setter: (s: string) => void;
    clear: VoidFunction;
}

const Pane = forwardRef<PaneRef, PaneProps>(
    (
        {
            label: _label,
            type,
            options,
            // ...
            value,
            setter,
            clear,
        },
        ref
    ) => {
        const { t } = useTranslation();

        const symbol = type === "price" ? "€" : "m²";
        const label = `${symbol} ${t(_label)}`;
        const ceiling = type === "price" ? PRICE_CEILING : AREA_CEILING;

        return (
            <Stack spacing={1}>
                <DebouncedInput
                    ref={ref}
                    label={label}
                    max={ceiling}
                    setter={setter}
                    value={value}
                />

                <Stack sx={OptionContainerSx}>
                    <MenuItem onClick={clear}>{t("Indifferent")}</MenuItem>
                    {options.map(getOption(value, setter))}
                </Stack>
            </Stack>
        );
    }
);

Pane.displayName = "Pane";

export type { PaneRef };
export default Pane;
