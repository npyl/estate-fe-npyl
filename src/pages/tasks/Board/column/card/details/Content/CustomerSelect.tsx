import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import { useMemo, useState } from "react";
import { useAllCustomersQuery } from "@/services/customers";
import { ICustomer } from "@/types/customer";
import { useTranslation } from "react-i18next";
import Autocomplete from "@/components/Autocomplete";

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

const CustomerSelect = () => {
    const { t } = useTranslation();

    const { data, isLoading } = useAllCustomersQuery();

    const options = useMemo(
        () => (Array.isArray(data) ? data?.map(getCustomerMini) : []),
        [data]
    );

    const [value, setValue] = useState<number>();

    return (
        <Autocomplete<ICustomerMini>
            loading={isLoading}
            value={value}
            onChange={setValue}
            renderOption={RenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={(props) => (
                <TextField label={t("Customer")} {...props} />
            )}
        />
    );
};

export default CustomerSelect;
