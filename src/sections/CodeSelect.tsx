import {
    Autocomplete,
    AutocompleteProps,
    MenuItem,
    SxProps,
    Theme,
} from "@mui/material";
import { useAllPropertyCodesQuery } from "src/services/properties";
import {
    forwardRef,
    ForwardedRef,
    useMemo,
    useCallback,
    SyntheticEvent,
} from "react";
import { IPropertyCodeRes } from "@/types/properties";

// ------------------------------------------------------------------------

const getOptionLabel = (o: (IPropertyCodeRes | IPropertyCodeRes[]) | number) =>
    typeof o === "number" ? "" : Array.isArray(o) ? `(${o.length})` : o.code;

// ------------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IPropertyCodeRes
) => (
    <MenuItem sx={OptionSx} {...props} key={option.id}>
        <img
            src="/static/categoryPhotos/home.webp"
            alt="Home"
            style={{ width: 30, height: 30 }}
        />
        {option.code}
    </MenuItem>
);

// ------------------------------------------------------------------------

type TMultiple = boolean;

interface CodeSelectProps<Multiple extends TMultiple = false>
    extends Omit<
        AutocompleteProps<IPropertyCodeRes, Multiple, true, false>,
        "options" | "value" | "onChange"
    > {
    idValue?: Multiple extends true ? number[] : number;
    codeValue?: Multiple extends true ? string[] : string;

    onChange?: (
        event: SyntheticEvent,
        ids: Multiple extends true ? number[] : number,
        codes: Multiple extends true ? string[] : string
    ) => void;
}

function CodeSelect<Multiple extends TMultiple = false>(
    { idValue, codeValue, onChange, ...props }: CodeSelectProps<Multiple>,
    ref: ForwardedRef<HTMLElement>
) {
    const { data, isLoading } = useAllPropertyCodesQuery();
    const codes = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const value = useMemo((): any => {
        if (idValue !== undefined) {
            return Array.isArray(idValue)
                ? codes?.filter(({ id }) => idValue.includes(id))
                : codes?.find(({ id }) => id === idValue);
        }

        if (codeValue !== undefined) {
            return Array.isArray(codeValue)
                ? codes?.filter(({ code }) => codeValue.includes(code))
                : codes?.find(({ code }) => code === codeValue);
        }

        return null;
    }, [codes, idValue, codeValue]);

    const handleChange = useCallback(
        (e: any, v: any) => {
            if (!v) return;

            const ids = Array.isArray(v) ? v.map(({ id }) => id) : v.id;
            const codes = Array.isArray(v) ? v.map(({ code }) => code) : v.code;

            onChange?.(e, ids, codes);
        },
        [onChange]
    );

    return (
        <Autocomplete
            ref={ref}
            loading={isLoading}
            disableClearable
            renderOption={RenderOption}
            getOptionLabel={getOptionLabel}
            options={codes}
            value={value}
            onChange={handleChange}
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
