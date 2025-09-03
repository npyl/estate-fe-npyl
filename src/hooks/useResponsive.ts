import { useTheme, Breakpoint, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Query = "up" | "down" | "only";

const getMethod = (theme: Theme, query: Query) => {
    switch (query) {
        case "up":
            return theme.breakpoints.up;
        case "down":
            return theme.breakpoints.down;
        case "only":
            return theme.breakpoints.only;
    }
};

const useResponsive = (query: Query, start: Breakpoint) => {
    const theme = useTheme();
    const method = getMethod(theme, query);
    return useMediaQuery(method(start));
};

export default useResponsive;
