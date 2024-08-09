import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

export type ResponsiveColumns = {
    [key in Breakpoint]?: number;
};

const breakpoints: Breakpoint[] = ["xl", "lg", "md", "sm", "xs"];

export const useResponsiveColumns = (
    columns: number | ResponsiveColumns
): number => {
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme.breakpoints.only("xl"));

    return useMemo(() => {
        if (typeof columns === "number") {
            return columns;
        }

        const currentBreakpoint = breakpoints.find((bp) => {
            switch (bp) {
                case "xs":
                    return isXs;
                case "sm":
                    return isSm;
                case "md":
                    return isMd;
                case "lg":
                    return isLg;
                case "xl":
                    return isXl;
            }
        });

        if (currentBreakpoint && columns[currentBreakpoint]) {
            return columns[currentBreakpoint]!;
        }

        // If no matching breakpoint is found, find the next smaller breakpoint
        const smallerBreakpoint = breakpoints.find(
            (bp) => columns[bp] !== undefined
        );

        return smallerBreakpoint ? columns[smallerBreakpoint]! : 1;
    }, [columns, isXs, isSm, isMd, isLg, isXl]);
};

export default useResponsiveColumns;
