import { ICustomer } from "@/types/customer";
import { useCallback } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const join = (v0: string | undefined, v1: string | undefined, sep: string) =>
    [v0, v1].filter((s) => !!s).join(sep) || "";

const useCustomerAutofill = (setValue: UseFormSetValue<FieldValues>) => {
    const autofill = useCallback((c: ICustomer) => {
        const fullName = join(c?.firstName, c?.lastName, " ");

        setValue("ownerId", c.id);
        setValue("owner", {
            fullName,
            email: c?.email || "",
            maidenName: "",
            idCardNumber: c?.idNumber || "",
            mobilePhone: c?.mobilePhone || "",
            vat: "",
            // ...
            city: c?.location?.city || "",
            street: c?.location?.street || "",
            number: c?.location?.number || "",
            // ...
            actingOnMyBehalf: "",
        });
    }, []);

    return autofill;
};

export default useCustomerAutofill;
