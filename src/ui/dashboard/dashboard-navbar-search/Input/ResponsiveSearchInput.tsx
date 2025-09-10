import { styled, SxProps, Theme } from "@mui/material";
import SearchInput, { SearchInputProps } from "@/components/Search/SearchInput";

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

const ResponsiveSearchInput = styled(SearchInput)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: MobileSx,
}));

export type { SearchInputProps as ResponsiveSearchInputProps };
export default ResponsiveSearchInput;
