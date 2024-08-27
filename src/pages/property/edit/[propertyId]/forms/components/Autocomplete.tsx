import { TextField, Autocomplete as MuiAutocomplete } from "@mui/material";
import { useAllCustomersQuery } from "src/services/customers";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

// Utility function to normalize strings by removing accents/diacritical marks
const normalizeString = (str: string) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

const Autocomplete = () => {
    const { t } = useTranslation();

    const { watch, setValue } = useFormContext();
    const { data: owners } = useAllCustomersQuery();
    const owner = watch("ownerId");

    const ownerNames = useMemo(() => {
        // Filter and map owners to get only those with seller or lessor properties
        const filteredOwners =
            owners
                ?.filter(({ seller, lessor }) => seller || lessor)
                .map(({ firstName, lastName, id }) => ({
                    firstName,
                    lastName,
                    id,
                })) || [];

        // Remove duplicate owners based on firstName and lastName
        const uniqueOwners = filteredOwners.filter(
            (value, index, self) =>
                index ===
                self.findIndex(
                    (t) =>
                        t.firstName === value.firstName &&
                        t.lastName === value.lastName
                )
        );

        return uniqueOwners;
    }, [owners]);

    const value = useMemo(() => {
        const o = ownerNames.find((i) => i.id == owner);
        return {
            firstName: o?.firstName || "",
            lastName: o?.lastName || "",
            id: owner,
        };
    }, [owner, ownerNames]);

    const handleChange = useCallback(
        (e: any, v: any | null) => setValue("ownerId", v?.id || ""),
        [setValue]
    );

    const filterOptions = (
        options: any[],
        { inputValue }: { inputValue: string }
    ) => {
        const normalizedInput = normalizeString(inputValue);

        return options.filter((option) => {
            const normalizedOption = normalizeString(
                `${option.firstName} ${option.lastName}`
            );
            return normalizedOption.includes(normalizedInput);
        });
    };

    return (
        <MuiAutocomplete
            fullWidth
            options={ownerNames}
            value={value}
            getOptionLabel={(o) => `${o.firstName} ${o.lastName}`}
            filterOptions={filterOptions}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField {...params} label={t("Owner")} />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {`${option.firstName} ${option.lastName}`}
                </li>
            )}
        />
    );
};

export default Autocomplete;
