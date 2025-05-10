import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import { ICustomerMini } from "@/types/customer";
import { useFormContext, useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../types";
import { useCallback, useMemo } from "react";
import CustomerMultiple from "@/sections/_Autocompletes/CustomerMultiple";
import { useGetNamesQuery } from "@/services/customers";

const onlyWithEmail = ({ email }: ICustomerMini) => Boolean(email);

const isEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const reduceValue =
    (data?: ICustomerMini[]) => (acc: number[], toEmail: string) => {
        const cId = data?.find(({ email }) => email === toEmail)?.id;
        if (Boolean(cId)) acc.push(cId!);
        return acc;
    };

const reduceIdToEmail =
    (data?: ICustomerMini[]) => (acc: string[], toId: number) => {
        const email = data?.find(({ id }) => id === toId)?.email;
        if (email) acc.push(email);
        return acc;
    };

const Recipients = () => {
    const { t } = useTranslation();

    const { setValue } = useFormContext<TMessageBoxValues>();

    const { data } = useGetNamesQuery();
    const to = useWatch<TMessageBoxValues>({
        name: "to",
    }) as string[];
    const value = useMemo(() => to.reduce(reduceValue(data), []), [to, data]);
    const onChange = useCallback(
        (ids: number[]) => {
            const found = ids.reduce(reduceIdToEmail(data), []);
            setValue("to", found, { shouldDirty: true });
        },
        [data, setValue]
    );

    const toFreeSoloed = useWatch<TMessageBoxValues>({
        name: "toFreeSoloed",
    }) as string[];
    const onFreeSoloed = useCallback(
        (v: string) => {
            if (!v || !isEmail(v)) return;
            const values = [...toFreeSoloed, v];
            setValue("toFreeSoloed", values, { shouldDirty: true });
        },
        [toFreeSoloed]
    );
    const onFreeSoloedDelete = useCallback(
        (idx: number) => {
            const filtered = toFreeSoloed.filter((_, i) => i !== idx);
            setValue("toFreeSoloed", filtered, { shouldDirty: true });
        },
        [toFreeSoloed, onFreeSoloed]
    );

    return (
        <CustomerMultiple
            freeSolo
            freeSoloed={toFreeSoloed}
            onFreeSoloed={onFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            value={value}
            onChange={onChange}
            optionFilter={onlyWithEmail}
            renderInput={(params) => (
                <InputField placeholder={t<string>("To")} {...params} />
            )}
        />
    );
};

export default Recipients;
