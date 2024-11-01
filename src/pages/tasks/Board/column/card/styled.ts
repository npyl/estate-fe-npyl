import Paper, { PaperProps } from "@mui/material/Paper";
import { alpha, styled, Theme } from "@mui/material/styles";

// ------------------- Priority ---------------------

const getBgcolor =
    (p: number) =>
    ({ palette: { warning, info, error } }: Theme) =>
        alpha(p === 0 ? info.main : p === 1 ? warning.main : error.main, 0.1);

const getColor =
    (p: number) =>
    ({ palette: { warning, info, error } }: Theme) =>
        p === 0 ? info.main : p === 1 ? warning.main : error.main;

// --------------------------------------------------

interface TaskCardProps extends PaperProps {
    priority: number;
}

const StyledPaper = styled(Paper)<TaskCardProps>(({ theme, priority }) => ({
    padding: theme.spacing(1),

    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    borderRadius: "12px",
    borderLeft: "14px solid",
    borderLeftColor: getColor(priority)(theme),

    minHeight: "148px",

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
}));

export { getColor, getBgcolor, StyledPaper };
