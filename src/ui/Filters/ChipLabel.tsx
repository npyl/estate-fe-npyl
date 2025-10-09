import { formatThousands } from "@/utils/formatNumber";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";

interface ChipLabelProps {
    title: string;
    value?: number | string;
    separateThousands?: boolean;
}

const ChipLabel: FC<ChipLabelProps> = ({
    title,
    value: _value,
    separateThousands = false,
}) => {
    const value = useMemo(
        () => (separateThousands ? formatThousands(_value) : (_value ?? "")),
        [separateThousands, _value]
    );

    return (
        <Stack direction="row" spacing={1}>
            <Typography fontWeight="medium">{title}:</Typography>
            <Typography textTransform="capitalize">{value}</Typography>
        </Stack>
    );
};

export default ChipLabel;
