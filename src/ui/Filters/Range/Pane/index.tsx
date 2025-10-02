import { MenuItem, Stack, SxProps, Theme } from "@mui/material";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import DebouncedInput, { DebouncedInputRef } from "./DebouncedInput";
import { formatThousands } from "@/utils/formatNumber";

// --------------------------------------------------------------------------------------

const getOptionTestId = (type: "min" | "max", value: string | number) =>
    `PPRangeSelect-Pane-Option-${type}-${value}`;

const OptionContainerSx: SxProps<Theme> = {
    maxHeight: 300,
    overflowY: "auto",
};

const getOption =
    (
        type: "min" | "max",
        value: number | undefined,
        onClick: (o: string) => void
    ) =>
    (o: number) => (
        <MenuItem
            key={o}
            data-testid={getOptionTestId(type, o)}
            onClick={() => onClick(o.toString())}
            selected={value === o}
        >
            {formatThousands(o)}
        </MenuItem>
    );

// --------------------------------------------------------------------------------------

const getInputTestId = (type: "min" | "max") =>
    `PPRangeSelect-Pane-Input-${type}`;

interface PaneRef extends DebouncedInputRef {}

interface PaneProps {
    type: "min" | "max";
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
            type,
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

        const _label = type === "min" ? "from" : "to";
        const label = `${symbol} ${t(_label)}`;

        return (
            <Stack spacing={1}>
                <DebouncedInput
                    ref={ref}
                    data-testid={getInputTestId(type)}
                    label={label}
                    max={ceiling}
                    setter={setter}
                    value={value}
                />

                <Stack sx={OptionContainerSx}>
                    <MenuItem
                        data-testid={getOptionTestId(type, -1)}
                        onClick={clear}
                    >
                        {t("Indifferent")}
                    </MenuItem>
                    {options.map(getOption(type, value, setter))}
                </Stack>
            </Stack>
        );
    }
);

Pane.displayName = "Pane";

export { getInputTestId, getOptionTestId };
export type { PaneRef };
export default Pane;
