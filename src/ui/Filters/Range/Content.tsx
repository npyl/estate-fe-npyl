import { MenuItem, Stack, SxProps, Theme } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import DebouncedInput from "./DebouncedInput";
import { Props } from "./types";
import formatNumber from "./formatNumber";

const OptionContainerSx: SxProps<Theme> = {
    maxHeight: 300,
    overflowY: "auto",
};

const getOption =
    (value: number | undefined, onClick: (o: number) => void) =>
    (o: number) => (
        <MenuItem key={o} onClick={() => onClick(o)} selected={value === o}>
            {formatNumber(o)}
        </MenuItem>
    );

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

    const clearMin = useCallback(() => setMin(undefined), []);
    const clearMax = useCallback(() => setMax(undefined), []);

    const onClickMin = useCallback(
        (o: number) => {
            valueMax && o > valueMax && valueMax !== 0 ? setMax(o) : setMin(o);
        },
        [valueMax]
    );

    const onClickMax = useCallback(
        (o: number) => {
            valueMin && o < valueMin ? setMin(o) : setMax(o);
        },
        [valueMin]
    );

    return (
        <Stack direction="row" spacing={1}>
            <Stack spacing={1}>
                <DebouncedInput
                    label={`${symbol} ${t("from")}`}
                    max={MAX_OPTION}
                    setter={setMin}
                    value={valueMin}
                />

                <Stack sx={OptionContainerSx}>
                    <MenuItem onClick={clearMin}>{t("Indifferent")}</MenuItem>
                    {options.map(getOption(valueMin, onClickMin))}
                </Stack>
            </Stack>

            <Stack spacing={1}>
                <DebouncedInput
                    label={`${symbol} ${t("to")}`}
                    max={MAX_OPTION}
                    setter={setMax}
                    value={valueMax}
                />

                <Stack sx={OptionContainerSx}>
                    <MenuItem onClick={clearMax}>{t("Indifferent")}</MenuItem>
                    {options.map(getOption(valueMax, onClickMax))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Content;
