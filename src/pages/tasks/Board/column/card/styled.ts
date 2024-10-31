import Paper, { PaperProps } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface TaskCardProps extends PaperProps {
    priority: number;
}

const StyledPaper = styled(Paper)<TaskCardProps>(({ theme, priority }) => ({
    padding: theme.spacing(1),
    borderRadius: "12px",
    borderLeft: "14px solid",
    borderLeftColor: priority === 0 ? "red" : priority === 1 ? "green" : "blue",
}));

export { StyledPaper };
