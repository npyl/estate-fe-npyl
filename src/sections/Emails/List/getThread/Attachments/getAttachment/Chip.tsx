import { primary } from "@/theme/light-theme-options";
import { alpha, SxProps, Theme } from "@mui/material";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import { CircularProgress } from "@mui/material";
import { FC } from "react";
import MimeTypeIcon from "@/components/MimeTypeIcon";

const ChipSx: SxProps<Theme> = {
    p: 1,
    py: 2,

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
    extends Omit<MuiChipProps, "icon" | "variant" | "size" | "clickable"> {
    filename: string;
    mimeType: string;
    size: string;
    loading?: boolean;
}

const Chip: FC<ChipProps> = ({
    loading = false,
    mimeType,
    filename,
    size,
    sx,
    ...props
}) => {
    const icon = loading ? (
        <CircularProgress size={15} />
    ) : (
        <MimeTypeIcon mimeType={mimeType} />
    );

    const label = `${filename} (${size})`;

    return (
        <MuiChip
            icon={icon}
            label={label}
            variant="outlined"
            size="small"
            clickable
            sx={{ ...ChipSx, ...sx }}
            {...props}
        />
    );
};

export default Chip;
