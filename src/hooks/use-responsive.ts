import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ----------------------------------------------------------------------

export function useResponsive(
    query: string,
    start: Breakpoint,
    end?: Breakpoint | number
) {
    const theme = useTheme();

    const mediaUp = useMediaQuery(theme.breakpoints.up(start));

    const mediaDown = useMediaQuery(theme.breakpoints.down(start));
    const mediaBetween = useMediaQuery(
        theme.breakpoints.between(start, end || 0)
    );

    const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

    if (query === "up") {
        return mediaUp;
    }

    if (query === "down") {
        return mediaDown;
    }

    if (query === "between" && end) {
        return mediaBetween;
    }

    return mediaOnly;
}
