import { FieldValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IProperties } from "@/types/properties";
import { useCallback } from "react";

const join = (v0: string | undefined, v1: string | undefined, sep: string) =>
    [v0, v1].filter((s) => !!s).join(sep) || "";

const useAutofill = (setValue: UseFormSetValue<FieldValues>) => {
    const { i18n } = useTranslation();

    const autofill = useCallback(
        (p: IProperties) => {
            const { owner, location, descriptions } = p || {};
            const {
                region,
                street: address,
                number: addressNumber,
            } = location || {};

            const description = descriptions[i18n.language];

            const type = join(
                p?.parentCategory?.value,
                p?.category?.value,
                " - "
            );
            const ownerFullname = join(owner?.firstName, owner?.lastName, " ");

            setValue("ownerId", p.owner?.id || -1);
            setValue("propertyId", p.id);
            setValue("title", description.title);
            // ...
            setValue("property", {
                region: region || "",
                address: address || "",
                addressNumber: addressNumber || "",
                type,
                floor: p?.details?.floor?.value || "",
                livingSpace: p?.area ? `${p.area}` : "",
                description: "",
                price: p?.price ? `${p.price}` : "",
            });
            setValue("owner", {
                fullName: ownerFullname,
                email: owner?.email || "",
                maidenName: "",
                idCardNumber: owner?.idNumber || "",
                mobilePhone: owner?.mobilePhone || "",
                vat: "",
                // ...
                city: owner?.location?.city || "",
                street: owner?.location?.street || "",
                number: owner?.location?.number || "",
                // ...
                actingOnMyBehalf: "",
            });
        },
        [i18n.language]
    );

    return { autofill };
};

export default useAutofill;
