import { primary } from "@/theme/light-theme-options";
import { alpha, SxProps, Theme } from "@mui/material";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { CircularProgress } from "@mui/material";
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
    extends Omit<MuiChipProps, "icon" | "variant" | "size" | "clickable"> {
    loading?: boolean;
}

const Chip: FC<ChipProps> = ({ loading = false, sx, ...props }) => {
    const icon = loading ? <CircularProgress size={15} /> : <AttachmentIcon />;

    return (
        <MuiChip
            icon={icon}
            variant="outlined"
            size="small"
            clickable
            sx={{ ...ChipSx, ...sx }}
            {...props}
        />
    );
};

export default Chip;
