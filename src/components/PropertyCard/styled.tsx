import { Box, BoxProps, Theme, Typography, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatNumberWithCommas } from "@/utils/formatNumber";

const getCss = (theme: Theme) => ({
    boxShadow:
        theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.6) 0px 5px 8px"
            : "rgba(255, 255, 255, 0.6) 0px 5px 8px",
    transition: "all 0.2s ease-in-out",
});

interface StyledBoxProps extends BoxProps {
    isActive: boolean;
}

export const StyledBox = styled(Box)<StyledBoxProps>(({ isActive, theme }) => ({
    "&:hover": {
        ...getCss(theme),
    },
    ...(isActive ? getCss(theme) : {}),
}));

interface PriceBadgeProps extends BoxProps {
    price: number;
}

export const PriceBadge = styled(({ price, ...props }: PriceBadgeProps) => (
    <Box {...props}>
        <Typography variant="body2">
            {`${price ? formatNumberWithCommas(price) : "N/A"} €`}
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
    color: "yellow" | "indigo";
}

export const NormalBadge = styled(
    ({ name, color, ...props }: NormalBadgeProps) => (
        <Box {...props}>
            <Typography variant="body2">{name}</Typography>
        </Box>
    )
)<NormalBadgeProps>(({ theme, color }) => ({
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),

    textAlign: "center",

    borderRadius: "25px",

    ...(theme.palette.mode === "light"
        ? {
              color:
                  color === "yellow"
                      ? "#854d0e"
                      : color === "indigo"
                      ? "#3730a3"
                      : "",

              backgroundColor:
                  color === "yellow"
                      ? alpha("#ffcc00", 0.2)
                      : color === "indigo"
                      ? alpha("#3730a3", 0.25)
                      : "",
          }
        : {
              color:
                  color === "yellow"
                      ? "#c49102"
                      : color === "indigo"
                      ? "#4c5fd7"
                      : "",

              backgroundColor:
                  color === "yellow"
                      ? alpha("#c49102", 0.3) // Slightly brighter amber for dark mode, without alpha adjustment
                      : color === "indigo"
                      ? alpha("#4c5fd7", 0.3) // Lighter indigo suitable for dark backgrounds, without alpha adjustment
                      : "",
          }),
}));
