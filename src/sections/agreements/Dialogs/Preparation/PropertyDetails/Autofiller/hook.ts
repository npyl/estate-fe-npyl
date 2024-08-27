import { useTranslation } from "react-i18next";
import { IProperties } from "@/types/properties";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useFormContext } from "react-hook-form";

const join = (v0: string | undefined, v1: string | undefined, sep: string) =>
    [v0, v1].filter((s) => !!s).join(sep) || "";

const NO_OWNER_LITERAL = "_NO_OWNER_LITERAL_";

const useAutofill = () => {
    const { setValue } = useFormContext();
    const { t, i18n } = useTranslation();

    const autofill = useCallback(
        (p: IProperties) => {
            // Prevent from autofilling from property without owner
            if (!p?.owner?.id) {
                toast.error(t(NO_OWNER_LITERAL));
                setValue("propertyId", -1);
                return;
            }

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
