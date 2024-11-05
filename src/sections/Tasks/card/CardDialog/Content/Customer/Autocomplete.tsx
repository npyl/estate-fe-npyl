import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import { FC, useMemo } from "react";
import { useAllCustomersQuery } from "@/services/customers";
import { ICustomer } from "@/types/customer";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";

interface ICustomerMini {
    id: number;
    firstName: string;
    lastName: string;
}

const getCustomerMini = ({
    id,
    firstName,
    lastName,
}: ICustomer): ICustomerMini => ({ id, firstName, lastName });

const getOptionLabel = ({ firstName, lastName }: ICustomerMini) =>
    `${firstName} ${lastName}`;

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: ICustomerMini
) => (
    <MenuItem sx={OptionSx} {...props} key={option.id}>
        {option.firstName} {option.lastName}
    </MenuItem>
);

interface CustomerAutocompleteProps
    extends Omit<AutocompleteProps<ICustomerMini>, "options" | "renderInput"> {
    label: string;
    error: boolean;
    helperText?: string;
}

const CustomerAutocomplete: FC<CustomerAutocompleteProps> = ({
    label,
    error,
    helperText,
    ...props
}) => {
    const { data, isLoading } = useAllCustomersQuery();

    const options = useMemo(
        () => (Array.isArray(data) ? data?.map(getCustomerMini) : []),
        [data]
    );

    return (
        <Autocomplete<ICustomerMini>
            loading={isLoading}
            renderOption={RenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={(props) => (
                <TextField
                    label={label}
                    {...props}
                    error={error}
                    helperText={helperText}
                />
            )}
            {...props}
        />
    );
};

export default CustomerAutocomplete;
