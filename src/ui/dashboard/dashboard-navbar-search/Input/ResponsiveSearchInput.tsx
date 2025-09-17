import { styled, SxProps, Theme } from "@mui/material";
import SearchInput, { SearchInputProps } from "@/components/Search/SearchInput";

const getMobileSx = (theme: Theme): SxProps<Theme> => ({
    transition: "all 1s ease-in-in",

    "&:focus-within": {
        position: "absolute",
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: theme.zIndex.modal,
        width: "calc(100vw - 16px)",
        boxShadow: theme.shadows[20],
    },
});

const ResponsiveSearchInput = styled(SearchInput)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: getMobileSx(theme),
}));

export type { SearchInputProps as ResponsiveSearchInputProps };
export default ResponsiveSearchInput;
