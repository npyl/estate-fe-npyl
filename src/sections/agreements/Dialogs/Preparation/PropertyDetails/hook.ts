import { FieldValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IProperties } from "@/types/properties";
import { useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";

// interface IAgreementFormData {
//     manager: {
//         fullName: string;
//         title: string;
//         vat: string;
//         taxOffice: string;
//         genComReg: string; // ΓΕΜΗ
//     };
//     company: {
//         address: string;
//         homePhone: string;
//         mobilePhone: string;
//         email: string;
//     };
//     owner: IAgreementOwner;
//     commissionAndDuration: {
//         payment: string;
//         flatRate: string;
//         percentage: string;
//         months: string;
//         defects: string;
//     };
//     gdpr?: {
//         // TODO: this
//         email?: string;
//         address?: string;
//     };
// }

const join = (v0: string | undefined, v1: string | undefined, sep: string) =>
    [v0, v1].filter((s) => !!s).join(sep) || "";

const useAutofill = (setValue: UseFormSetValue<FieldValues>) => {
    const { i18n } = useTranslation();

    const { user } = useAuth();

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
                p.category?.value,
                " - "
            );
            const ownerFullname = join(owner?.firstName, owner.lastName, " ");
            const userFullname = join(user?.firstName, user?.lastName, " ");

            setValue("ownerId", p.owner.id);
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
            setValue("manager", {
                fullName: userFullname,
                title: "",
                vat: user?.afm || "",
                taxOffice: user?.doy || "",
                genComReg: user?.gemh || "", // ΓΕΜΗ
            });
        },
        [i18n.language, user]
    );

    return { autofill };
};

export default useAutofill;
