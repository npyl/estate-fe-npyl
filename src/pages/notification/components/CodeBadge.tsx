import { styled } from "@mui/material/styles";
import { Box, BoxProps, Theme, Typography, alpha } from "@mui/material";

interface CodeBadgeProps extends BoxProps {
    name: string;
    color: string; //ADD here the Colors needed
}

export const CodeBadge = styled(({ name, color, ...props }: CodeBadgeProps) => (
    <Box {...props}>
        <Typography variant="body2">{name}</Typography>
    </Box>
))<CodeBadgeProps>(({ theme, color }) => ({
    paddingLeft: theme.spacing(1.8),
    paddingRight: theme.spacing(1.8),
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),

    textAlign: "center",
    borderRadius: "25px",
    color: color,

    backgroundColor: alpha(color, 0.65),
}));
