import Link from "@/components/Link";
import {
    Box,
    BoxProps,
    SxProps,
    Theme,
    Typography,
    alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const getCss = (theme: Theme) => ({
    boxShadow:
        theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.6) 0px 5px 8px"
            : "rgba(255, 255, 255, 0.6) 0px 5px 8px",
    transition: "boxShadow 0.1s ease-in-out",
});

interface StyledBoxProps extends BoxProps {
    isActive: boolean;
}
export const StyledLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== "isActive",
})<StyledBoxProps>(({ isActive, theme }) => ({
    display: "block", // INFO: without it the onHover css is not applied
    borderRadius: "12px",
    cursor: "pointer",
    "&:hover": {
        ...getCss(theme),
    },
    backgroundColor: theme.palette.background.paper,
    ...(isActive ? getCss(theme) : {}),
}));

interface PriceBadgeProps extends BoxProps {
    price: number;
}

export const PriceBadge = styled(({ price, ...props }: PriceBadgeProps) => (
    <Box {...props}>
        <Typography variant="body2">
            {`${price ? price?.toLocaleString("de-DE") : "-"} €`}
        </Typography>
    </Box>
))<PriceBadgeProps>(({ theme }) => ({
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),

    textAlign: "center",

    borderRadius: "10px",
    border: "2px solid",
    borderColor:
        theme.palette.mode === "light"
            ? theme.palette.grey?.[600]
            : theme.palette.neutral?.[600],

    color:
        theme.palette.mode === "light"
            ? theme.palette.grey?.[600]
            : theme.palette.neutral?.[400],
}));

interface NormalBadgeProps extends BoxProps {
    name: string;
    color: string; //ADD here the Colors needed
}

export const NormalBadge = styled(
    ({ name, color, ...props }: NormalBadgeProps) => (
        <Box {...props}>
            <Typography variant="body2">{name}</Typography>
        </Box>
    )
)<NormalBadgeProps>(({ theme, color }) => ({
    paddingLeft: theme.spacing(1.8),
    paddingRight: theme.spacing(1.8),
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),
    textAlign: "center",
    borderRadius: "25px",
    color: alpha(color, 1),
    backgroundColor: alpha(color, 0.25),
}));

const DividerSx: SxProps<Theme> = {
    width: "15%",
    borderColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? neutral?.[100] : neutral?.[800],
};

export { DividerSx };
