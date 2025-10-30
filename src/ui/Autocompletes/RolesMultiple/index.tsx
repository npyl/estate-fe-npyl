import { ForwardedRef, forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import MultilineTextField from "@/components/MultilineTextField";
import renderUserTags, { getTagClassname } from "./renderUserTags";
import { AutocompleteRenderInputParams } from "@mui/material";
import getOptionLabel from "./getOptionLabel";
import { RoleMini } from "@/types/roles";
import { useGetAllRolesQuery } from "@/services/roles";
import getRenderOption from "./getRenderOption";

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

interface RolesMultipleAutocompleteProps<FreeSolo extends boolean = false>
    extends Omit<
        AutocompleteProps<RoleMini, true, true, FreeSolo>,
        "options" | "renderInput" | "renderOption" | "renderTags"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;

    // INFO: make optional
    renderInput?: AutocompleteProps<
        RoleMini,
        true,
        true,
        FreeSolo
    >["renderInput"];
}

function UnforwardedRolesMultipleAutocomplete<FreeSolo extends boolean = false>(
    {
        label,
        error,
        helperText,
        renderInput,
        ...props
    }: RolesMultipleAutocompleteProps<FreeSolo>,
    ref: ForwardedRef<HTMLElement>
) {
    const { data, isLoading } = useGetAllRolesQuery();

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
            options={data ?? []}
            getOptionLabel={getOptionLabel as any}
            renderTags={renderUserTags}
            renderInput={renderInput ?? defaultRenderInput}
            {...props}
        />
    );
}

const RolesMultipleAutocomplete = forwardRef(
    UnforwardedRolesMultipleAutocomplete
) as <FreeSolo extends boolean = false>(
    props: RolesMultipleAutocompleteProps<FreeSolo> & {
        ref?: ForwardedRef<HTMLElement>;
    }
) => JSX.Element;

UnforwardedRolesMultipleAutocomplete.displayName = "RoleMultipleAutocomplete";

export { getTagClassname };
export type { RolesMultipleAutocompleteProps };
export default RolesMultipleAutocomplete;
