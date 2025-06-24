import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TranslationType } from "@/types/translation";
import { ICustomerYup } from "./types";
import useFormPersist from "@/components/hook-form/useFormPersist";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";
import { demandMapper } from "@/mappers/demand";
import { B2BMember2Req, ICustomer } from "@/types/customer";
import useFormPersistStorageKey from "@/ui/useFormPersistStorageKey";

const getLoginSchema = (t: TranslationType) =>
    z
        .object({
            firstName: z.string().min(1, t<string>("First Name is required")),
            lastName: z.string(),
            email: z
                .string()
                .email(t<string>("Email must be a valid email address")),
            afm: z
                .string()
                .refine(
                    (value) => !value || value.length === 9,
                    t<string>("VAT must be empty or exactly 9 digits")
                ),
            b2b: z.boolean(),
        })
        .passthrough()
        .refine(
            (data) => {
                // If b2b is false, lastName is required
                if (
                    !data.b2b &&
                    (!data.lastName || data.lastName.trim() === "")
                ) {
                    return false;
                }
                return true;
            },
            {
                message: t<string>("Last Name is required"),
                path: ["lastName"],
            }
        );

const getDefaultValues = (customer?: Partial<ICustomer>): ICustomerYup => ({
    id: customer?.id,

    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    afm: customer?.afm || "",
    managedBy: customer?.managedBy?.id || "",
    mobilePhone: customer?.mobilePhone || "",

    location: {
        street: customer?.location?.street || "",
        number: customer?.location?.number || "",
        city: customer?.location?.city || "",
    },

    status: customer?.status || 0,

    lessor: customer?.lessor || false,
    leaser: customer?.leaser || false,
    buyer: customer?.buyer || false,
    seller: customer?.seller || false,

    // prevent nulls:
    homePhone: customer?.homePhone || "",
    fax: customer?.fax || "",
    idNumber: customer?.idNumber || "",
    dateOfBirth: customer?.dateOfBirth,
    passportNumber: customer?.passportNumber || "",

    nationality: customer?.nationality?.key || "GREEK", // NICK: just for now, before the Guatemala tour
    preferredLanguage: customer?.preferredLanguage?.key || "GREEK", // just for now, before the Guatemala tour
    leadSource: customer?.leadSource?.key || null,

    demands: customer?.demands?.map(demandMapper) ?? [],

    // INFO: this field will only contain data on customer creation
    notes: [],

    enableEmails: customer?.enableEmails || false,

    b2b: customer?.b2b ?? false,
    b2bMembers: customer?.members?.map(B2BMember2Req) || [],
    labelIDs: [],
});

const useCustomerForm = (
    quickCreate: boolean,
    customer: Partial<ICustomer> | undefined,
    onSaveSuccess: VoidFunction | null
) => {
    const { t } = useTranslation();

    const defaultValues = useMemo(() => getDefaultValues(customer), [customer]);
    const LoginSchema = useMemo(() => getLoginSchema(t), [t]);

    const cookieKey = useFormPersistStorageKey(
        "PPCustomerForm",
        customer?.id,
        quickCreate
    );

    const all = useFormPersist<ICustomerYup>(cookieKey, onSaveSuccess, {
        resolver: zodResolver(LoginSchema),
        values: defaultValues,
    });

    const [methods, { PersistNotice }] = all;

    const haveError = useMemo(
        () => Object.keys(methods.formState.errors).length > 0,
        [methods.formState.errors]
    );

    // Scroll to top on error
    useEffect(() => {
        if (haveError) window.scrollTo(0, 0);
    }, [haveError]);

    return { methods, PersistNotice };
};

export default useCustomerForm;
