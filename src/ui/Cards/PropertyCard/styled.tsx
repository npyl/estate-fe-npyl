import Link from "@/components/Link";
import {
    alpha,
    Box,
    BoxProps,
    SxProps,
    Theme,
    Typography,
    TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";

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
    borderRadius: "20px",
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
        <Typography variant="body2" fontWeight={500}>
            {`${price ? price?.toLocaleString("de-DE") : "-"} €`}
        </Typography>
    </Box>
))<PriceBadgeProps>(({ theme }) => ({
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.2),

    textAlign: "center",

    borderRadius: "10px",
    border: "2.5px solid",
    borderColor:
        theme.palette.mode === "light"
            ? theme.palette.grey?.[600]
            : theme.palette.neutral?.[600],

    color:
        theme.palette.mode === "light"
            ? theme.palette.grey?.[600]
            : theme.palette.neutral?.[400],
}));

// --------------------------------------------------------------------------------

const DividerSx: SxProps<Theme> = {
    width: "15%",
    borderColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? neutral?.[100] : neutral?.[800],
};

// --------------------------------------------------------------------------------

const getSx = (color: string): SxProps => ({
    paddingLeft: 1.8,
    paddingRight: 1.8,
    paddingTop: 0.4,
    paddingBottom: 0.4,

    textAlign: "center",

    borderRadius: "25px",

    textOverflow: "ellipsis",
    overflowX: "hidden",

    width: "fit-content", // INFO: try to show whole text
    maxWidth: 1, // INFO: but do not grow bigger than the container
    textWrap: "nowrap",

    color: alpha(color, 1),
    backgroundColor: alpha(color, 0.25),
});

interface NormalBadgeProps extends TypographyProps {
    name: string;
    color: string;
}

const NormalBadge: FC<NormalBadgeProps> = ({ name, color, sx, ...props }) => (
    <Typography
        variant="body2"
        sx={{ ...(getSx(color) as any), ...sx }}
        {...props}
    >
        {name}
    </Typography>
);

export type { NormalBadgeProps };

export { NormalBadge, DividerSx };
