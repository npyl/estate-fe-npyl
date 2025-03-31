import { lighten, SxProps, Theme } from "@mui/material/styles";
import { getTaskColor } from "../styled";

const getPaperSx = (priority: number): SxProps<Theme> => ({
    padding: (theme) => theme.spacing(0.8),

    paddingLeft: (theme) => theme.spacing(2),
    paddingRight: (theme) => theme.spacing(2),

    borderRadius: "9px",
    borderLeft: "9px solid",
    borderLeftColor: (theme) => lighten(getTaskColor(priority)(theme), 0.5),

    minHeight: "148px",

    display: "flex",
    flexDirection: "column",
    gap: (theme) => theme.spacing(1),
});

export { getPaperSx };
