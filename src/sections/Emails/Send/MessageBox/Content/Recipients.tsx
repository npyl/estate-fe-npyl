import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import { useFormContext, useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../types";
import { useCallback } from "react";
import RecipientsPicker from "@/sections/Emails/Pickers/People";
import { useGetNamesQuery } from "@/services/customers";

const Recipients = () => {
    const { t } = useTranslation();

    const { setValue } = useFormContext<TMessageBoxValues>();

    const { data } = useGetNamesQuery();
    const to = useWatch<TMessageBoxValues>({
        name: "to",
    }) as string[];

    const onChange = useCallback(
        (v: string[]) => setValue("to", v, { shouldDirty: true }),
        [data, setValue]
    );

    const toFreeSoloed = useWatch<TMessageBoxValues>({
        name: "toFreeSoloed",
    }) as string[];
    const onFreeSoloed = useCallback(
        (v: string[]) => setValue("toFreeSoloed", v, { shouldDirty: true }),
        []
    );
    const onFreeSoloedDelete = useCallback(
        (idx: number) => {
            const filtered = toFreeSoloed.filter((_, i) => i !== idx);
            setValue("toFreeSoloed", filtered, { shouldDirty: true });
        },
        [toFreeSoloed, onFreeSoloed]
    );

    return (
        <RecipientsPicker
            people={to}
            onChange={onChange}
            peopleFreeSoloed={toFreeSoloed}
            onFreeSoloed={onFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            renderInput={(params) => (
                <InputField placeholder={t<string>("To")} {...params} />
            )}
        />
    );
};

export default Recipients;
