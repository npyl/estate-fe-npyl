import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import OnlyNumbersInput from "src/components/OnlyNumbers";

import { useAllCustomersQuery } from "src/services/customers";
import { useAllUsersQuery } from "src/services/user";

interface EditProps<T> {
    data: T;
    setData: (data: T) => void;
}

export const EditManager = ({ data, setData }: EditProps<string>) => {
    const managers: string[] =
        useAllUsersQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter((manager) => manager.firstName && manager.lastName) // filter nulls
                    .map((manager) => {
                        return manager.firstName + " " + manager.lastName;
                    }),
            }),
        }).data || [];

    const autocompleteChange = (_event: any, value: string | null) => {
        setData(value || "");
    };

    return (
        <FormControl fullWidth>
            <Autocomplete
                disablePortal
                value={data}
                onChange={autocompleteChange}
                options={managers}
                renderInput={(params) => (
                    <TextField {...params} label="Manager" />
                )}
            />
        </FormControl>
    );
};

export const EditOwner = ({ data, setData }: EditProps<string>) => {
    const owners: string[] =
        useAllCustomersQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter(
                        (customer) => customer.firstName && customer.lastName
                    ) // filter nulls
                    .map((customer) => {
                        return customer.firstName + " " + customer.lastName;
                    }),
            }),
        }).data || [];

    const autocompleteChange = (_event: any, value: string | null) => {
        setData(value || "");
    };

    return (
        <FormControl fullWidth>
            <Autocomplete
                disablePortal
                value={data}
                onChange={autocompleteChange}
                options={owners}
                renderInput={(params) => (
                    <TextField {...params} label="Owner" />
                )}
            />
        </FormControl>
    );
};

export const EditZipCode = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <OnlyNumbersInput
            label={t("Zip Code")}
            value={data}
            onChange={setData}
        />
    );
};

export const EditArea = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <OnlyNumbersInput
            label={t("Area")}
            value={data}
            onChange={setData}
            adornment="m²"
        />
    );
};

export const EditLabels = ({ data, setData }: EditProps<number[]>) => {
    return <div>EditLabels Component</div>;
};

export const EditBedrooms = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <OnlyNumbersInput
            type="number"
            label={t("Bedrooms")}
            placeholder="1,2,3..."
            value={data}
            onChange={setData}
        />
    );
};

export const EditStatus = ({ data, setData }: EditProps<string>) => {
    return <div>EditStatus Component</div>;
};
