import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import RHFCustomerMultiple from "@/sections/_Autocompletes/RHFCustomerMultiple";
import { ICustomerMini } from "@/types/customer";
import { useFormContext, useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../types";
import { useCallback } from "react";

const onlyWithEmail = ({ email }: ICustomerMini) => Boolean(email);

const Recipients = () => {
    const { t } = useTranslation();

    const { setValue } = useFormContext<TMessageBoxValues>();
    const toFreeSoloed = useWatch<TMessageBoxValues>({
        name: "toFreeSoloed",
    }) as string[];
    const setToFreeSoloed = useCallback(
        (v: string[]) => setValue("toFreeSoloed", v, { shouldDirty: true }),
        []
    );

    return (
        <RHFCustomerMultiple
            name="to"
            freeSolo
            freeSoloed={toFreeSoloed}
            onFreeSoloed={setToFreeSoloed}
            // optionFilter={onlyWithEmail}
            renderInput={(params) => (
                <InputField placeholder={t<string>("To")} {...params} />
            )}
        />
    );
};

export default Recipients;
