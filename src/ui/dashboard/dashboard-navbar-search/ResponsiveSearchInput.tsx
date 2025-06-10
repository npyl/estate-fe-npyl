import { SxProps, Theme } from "@mui/material";
import { forwardRef } from "react";
import SearchInput, { SearchInputProps } from "@/components/Search/SearchInput";
import useResponsive from "@/hooks/useResponsive";

const MobileSx: SxProps<Theme> = {
    transition: "all 1s ease-in-in",

    "&:focus-within": {
        position: "absolute",
        top: 8,
        zIndex: ({ zIndex }) => zIndex.modal,
        width: "calc(100vw - 115px)",
        boxShadow: 20,
    },
};

// TODO: type instead of any?
const ResponsiveSearchInput = forwardRef<any, SearchInputProps>(
    ({ sx, ...props }, ref) => {
        const belowSm = useResponsive("down", "sm");

        return (
            <SearchInput
                ref={ref}
                sx={{
                    ...(belowSm ? MobileSx : {}),
                    ...sx,
                }}
                {...props}
            />
        );
    }
);

ResponsiveSearchInput.displayName = "ResponsiveSearchInput";

export default ResponsiveSearchInput;
