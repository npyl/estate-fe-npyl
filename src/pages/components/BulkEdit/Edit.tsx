import { Autocomplete, FormControl, TextField } from "@mui/material";
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
    return <div>EditOwner Component</div>;
};

export const EditZipCode = ({ data, setData }: EditProps<string>) => {
    return <div>EditZipCode Component</div>;
};

export const EditArea = ({ data, setData }: EditProps<string>) => {
    return <div>EditArea Component</div>;
};

export const EditLabels = ({ data, setData }: EditProps<number[]>) => {
    return <div>EditLabels Component</div>;
};

export const EditBedrooms = ({ data, setData }: EditProps<string>) => {
    return <div>EditBedrooms Component</div>;
};

export const EditStatus = ({ data, setData }: EditProps<string>) => {
    return <div>EditStatus Component</div>;
};
