import { Stack, SxProps, Theme } from "@mui/material";
import ResponsiveSearchInput from "./ResponsiveSearchInput";
import StartAdornment from "./StartAdornment";
import ClearButton from "./ClearButton";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import { SearchInputProps } from "@/components/Search/SearchInput";
import ModeSelect from "./ModeSelect";
import { SearchCategory } from "../types";
import { INPUT_WIDTH_LG } from "./constants";

const SearchInputSx: SxProps<Theme> = {
    input: {
        pl: { xs: 0, sm: "15px" }, // adjust this as needed
    },
    "input::placeholder": {
        textIndent: "0px", // adjust this as needed
    },
    p: { xs: 0.5, sm: 1 },
    width: { xs: "100%", lg: INPUT_WIDTH_LG },
};

interface InputProps
    extends Omit<
        SearchInputProps,
        | "ref"
        | "placeholder"
        | "startAdornment"
        | "endAdornment"
        | "onWheel"
        | "onTouchMove"
    > {
    searchCategory: string;
    onSearchCategoryChange: (s: SearchCategory) => void;
    onClear: VoidFunction;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { sx, searchCategory, onSearchCategoryChange, onClear, ...props },
        ref
    ) => {
        const { t } = useTranslation();

        return (
            <ResponsiveSearchInput
                ref={ref}
                placeholder={t<string>("Search")}
                sx={{ ...SearchInputSx, ...sx }}
                startAdornment={<StartAdornment />}
                endAdornment={
                    <Stack direction="row" spacing={1} alignItems="center">
                        {props.value ? <ClearButton onClick={onClear} /> : null}

                        <ModeSelect
                            value={searchCategory}
                            onChange={onSearchCategoryChange}
                        />
                    </Stack>
                }
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;
