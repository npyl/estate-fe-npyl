import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import CustomerAutocompleteMultiple from "@/sections/_Autocompletes/RHFCustomerMultiple";
import { useGetOwnedPropertiesMutation } from "@/services/customers";
import { useFormContext } from "react-hook-form";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import getDiffedIds from "./getDiffedIds";

const CustomerAutocomplete = () => {
    const { t } = useTranslation();

    const { getValues, setValue } = useFormContext<ICreateOrUpdateTaskReq>();
    const [get] = useGetOwnedPropertiesMutation();
    const onCustomersChange = useCallback(
        async (newIds: number[]) => {
            const oldIds = getValues("customers") || [];
            const diffed = getDiffedIds(oldIds, newIds);

            const res = await get(diffed);
            if ("error" in res) return;

            const old = getValues("properties") || [];
            const dataIds = res.data?.map(({ id }) => id) || [];

            setValue("properties", [...old, ...dataIds]);
        },
        [getValues]
    );

    return (
        <CustomerAutocompleteMultiple
            label={t("Customers")}
            name="customers"
            onChange={onCustomersChange}
        />
    );
};

export default CustomerAutocomplete;
