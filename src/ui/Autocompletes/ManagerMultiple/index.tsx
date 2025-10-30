import { ForwardedRef, forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import MultilineTextField from "@/components/MultilineTextField";
import renderUserTags, { getTagClassname } from "./renderUserTags";
import { AutocompleteRenderInputParams } from "@mui/material";
import getRenderOption from "@/ui/Autocompletes/Manager/getRenderOption";
import { IUserMini } from "@/types/user";
import { useAllUsersQuery } from "@/services/user";
import { getOptionLabel } from "@/ui/Autocompletes/Manager";

// -----------------------------------------------------------------------------

const getDefaultRenderInput =
    (
        label: string | undefined,
        error: boolean | undefined,
        helperText: string | undefined
    ) =>
    (params: AutocompleteRenderInputParams): React.ReactNode => (
        <MultilineTextField
            label={label}
            {...params}
            error={error}
            helperText={helperText}
        />
    );

// -----------------------------------------------------------------------------

interface ManagerMultipleAutocompleteProps<FreeSolo extends boolean = false>
    extends Omit<
        AutocompleteProps<IUserMini, true, true, FreeSolo>,
        "options" | "renderInput" | "renderOption" | "renderTags"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;

    optionFilter?: (c: IUserMini) => boolean;

    // INFO: make optional
    renderInput?: AutocompleteProps<
        IUserMini,
        true,
        true,
        FreeSolo
    >["renderInput"];
}

function UnforwardedManagerMultipleAutocomplete<
    FreeSolo extends boolean = false,
>(
    {
        label,
        error,
        helperText,
        optionFilter,
        renderInput,
        ...props
    }: ManagerMultipleAutocompleteProps<FreeSolo>,
    ref: ForwardedRef<HTMLElement>
) {
    const { data, isLoading } = useAllUsersQuery();
    const options = useMemo(() => {
        if (!Array.isArray(data)) return [];
        if (optionFilter) return data.filter(optionFilter);
        return data;
    }, [data, optionFilter]);

    const defaultRenderInput = useMemo(
        () => getDefaultRenderInput(label, error, helperText),
        [label, error, helperText]
    );

    return (
        <Autocomplete
            ref={ref}
            multiple
            disableClearable
            loading={isLoading}
            renderOption={getRenderOption}
            options={options}
            getOptionLabel={getOptionLabel as any}
            renderTags={renderUserTags}
            renderInput={renderInput ?? defaultRenderInput}
            {...props}
        />
    );
}

const ManagerMultipleAutocomplete = forwardRef(
    UnforwardedManagerMultipleAutocomplete
) as <FreeSolo extends boolean = false>(
    props: ManagerMultipleAutocompleteProps<FreeSolo> & {
        ref?: ForwardedRef<HTMLElement>;
    }
) => JSX.Element;

UnforwardedManagerMultipleAutocomplete.displayName =
    "ManagerMultipleAutocomplete";

export { getTagClassname };
export type { ManagerMultipleAutocompleteProps };
export default ManagerMultipleAutocomplete;
