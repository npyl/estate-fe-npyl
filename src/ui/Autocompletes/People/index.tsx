import { ForwardedRef, forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { ICustomerMini } from "@/types/customer";
import MultilineTextField from "@/components/MultilineTextField";
import {
    AutocompleteFreeSoloValueMapping,
    AutocompleteRenderInputParams,
} from "@mui/material";
import { isIUser, IUser } from "@/types/user";
import useOptions from "./useOptions";
import getRenderOption from "./getRenderOption";
import renderUserTags, { getTagClassname } from "./renderUserTags";

// -----------------------------------------------------------------------------

type TPerson = ICustomerMini | IUser;
type TFreeSolo = AutocompleteFreeSoloValueMapping<true>; // INFO: just a string

// -----------------------------------------------------------------------------

const getOptionKey = (o: TPerson | TFreeSolo) =>
    typeof o === "string"
        ? o
        : isIUser(o)
          ? `User-${o.id}`
          : `Customer-${o.id}`;

const getOptionLabel = (o: TPerson | TFreeSolo) =>
    typeof o === "string" ? o : `${o?.firstName} ${o?.lastName}`;

const getDefaultRenderInput =
    (
        label: string | undefined,
        error: boolean | undefined,
        helperText: string | undefined
    ) =>
    (params: AutocompleteRenderInputParams): React.ReactNode => (
        <MultilineTextField
            multiline
            label={label}
            {...params}
            error={error}
            helperText={helperText}
        />
    );

// -----------------------------------------------------------------------------

interface PeopleAutocompleteProps<FreeSolo extends boolean = false>
    extends Omit<
        AutocompleteProps<TPerson, true, true, FreeSolo>,
        "options" | "renderInput" | "renderOption" | "renderTags"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;

    customerOptionFilter?: (c: ICustomerMini) => boolean;
    managerOptionFilter?: (m: IUser) => boolean;

    // INFO: make optional
    renderInput?: AutocompleteProps<
        TPerson,
        true,
        true,
        FreeSolo
    >["renderInput"];
}

function UnforwardedPeopleAutocomplete<FreeSolo extends boolean = false>(
    {
        label,
        error,
        helperText,
        customerOptionFilter,
        managerOptionFilter,
        renderInput,
        ...props
    }: PeopleAutocompleteProps<FreeSolo>,
    ref: ForwardedRef<HTMLElement>
) {
    const [options, { isLoading }] = useOptions(
        customerOptionFilter,
        managerOptionFilter
    );

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
            getOptionKey={getOptionKey}
            options={options}
            getOptionLabel={getOptionLabel}
            renderTags={renderUserTags}
            renderInput={renderInput ?? defaultRenderInput}
            {...props}
        />
    );
}

// -----------------------------------------------------------------------

const PeopleAutocomplete = forwardRef(UnforwardedPeopleAutocomplete) as <
    FreeSolo extends boolean = false,
>(
    props: PeopleAutocompleteProps<FreeSolo> & {
        ref?: ForwardedRef<HTMLElement>;
    }
) => JSX.Element;

UnforwardedPeopleAutocomplete.displayName = "CustomerAutocomplete";

export { getTagClassname };
export type { PeopleAutocompleteProps, TPerson };
export default PeopleAutocomplete;
