import { primary } from "@/theme/light-theme-options";
import { alpha, SxProps, Theme } from "@mui/material";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import { FC } from "react";

const ChipSx: SxProps<Theme> = {
    "&:hover": {
        backgroundColor: alpha(primary.light, 0.5),
        "& .MuiChip-label": {
            color: "inherit",
        },
    },
    "&.MuiChip-clickable:hover": {
        backgroundColor: alpha(primary.light, 0.5),
    },
};

interface ChipProps
    extends Omit<MuiChipProps, "variant" | "size" | "clickable"> {}

const Chip: FC<ChipProps> = ({ sx, ...props }) => (
    <MuiChip
        variant="outlined"
        size="small"
        clickable
        sx={{ ...ChipSx, ...sx }}
        {...props}
    />
);

export default Chip;
