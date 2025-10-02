import { MenuItem, Stack, SxProps, Theme } from "@mui/material";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import DebouncedInput, { DebouncedInputRef } from "./DebouncedInput";
import { formatThousands } from "@/utils/formatNumber";

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
    symbol: string;
    ceiling: string;
    options: number[];

    value?: number;
    setter: (s: string) => void;
    clear: VoidFunction;
}

const Pane = forwardRef<PaneRef, PaneProps>(
    (
        {
            label: _label,
            symbol,
            ceiling,
            options,
            // ...
            value,
            setter,
            clear,
        },
        ref
    ) => {
        const { t } = useTranslation();

        const label = `${symbol} ${t(_label)}`;

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
