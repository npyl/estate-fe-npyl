import {
    Autocomplete,
    AutocompleteProps,
    MenuItem,
    SxProps,
    Theme,
} from "@mui/material";
import { useAllPropertyCodesQuery } from "src/services/properties";
import { forwardRef, ForwardedRef, useMemo } from "react";

// ------------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: string
) => (
    <MenuItem sx={OptionSx} {...props} key={option}>
        <img
            src="/static/categoryPhotos/home.webp"
            alt="Home"
            style={{ width: 30, height: 30 }}
        />
        {option}
    </MenuItem>
);

// ------------------------------------------------------------------------

type TMultiple = true | false;

type CodeSelectProps<Multiple extends TMultiple = false> = Omit<
    AutocompleteProps<string, Multiple, true, false>,
    "options"
>;

function CodeSelect<Multiple extends TMultiple = false>(
    props: CodeSelectProps<Multiple>,
    ref: ForwardedRef<HTMLElement>
) {
    const { data, isLoading } = useAllPropertyCodesQuery();
    const codes = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return (
        <Autocomplete
            ref={ref}
            loading={isLoading}
            disableClearable
            renderOption={RenderOption}
            options={codes}
            slotProps={{
                paper: {
                    sx: {
                        width: "fit-content",
                    },
                },
            }}
            {...props}
        />
    );
}

const ForwardedCodeSelect = forwardRef(CodeSelect) as <
    Multiple extends TMultiple = false
>(
    props: CodeSelectProps<Multiple> & { ref?: ForwardedRef<HTMLElement> }
) => JSX.Element;

CodeSelect.displayName = "CodeSelect";

export default ForwardedCodeSelect;
