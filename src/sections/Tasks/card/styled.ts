import Paper, { PaperProps } from "@mui/material/Paper";
import { lighten, styled } from "@mui/material/styles";
import { getTaskColor } from "../styled";

interface TaskCardProps extends PaperProps {
    priority: number;
}

const StyledPaper = styled(Paper)<TaskCardProps>(({ theme, priority }) => ({
    padding: theme.spacing(0.8),

    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    borderRadius: "9px",
    borderLeft: "9px solid",
    borderLeftColor: lighten(getTaskColor(priority)(theme), 0.5),

    minHeight: "148px",

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
}));

export { StyledPaper };
