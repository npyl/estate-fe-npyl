// Fill-in basic information for property, customer, etc. before filling-in the actual pdf

import Dialog, { DialogProps } from "@/components/Dialog";
import { RHFCheckbox, RHFDatePicker } from "@/components/hook-form";
import { IAgreementReq } from "@/types/agreements";
import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormProvider } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import PropertyDetails from "./PropertyDetails";
import { useCallback, useMemo } from "react";
import Schema from "./schema";
import {
    useCreateAgreementMutation,
    useGetAgreementByIdQuery,
    useUpdateAgreementMutation,
} from "@/services/agreements";
import { TLanguageType } from "@/types/translation";
import { getValues } from "./mapper";
import { StyledActions } from "./styled";
import SubmitButton from "./Buttons/Submit";
import ExportButton from "./Buttons/Export";
import EditPDFButton from "./Buttons/EditPDF";
import useFormPersist from "@/components/hook-form/useFormPersist";
import { TForm } from "./types";
import useFormPersistStorageKey from "@/ui/useFormPersistStorageKey";
import { useRouter } from "next/router";
import toNumberSafe from "@/utils/toNumberSafe";

// -------------------------------------------------------------------

const useInitialValues = (id?: number) => {
    const { i18n } = useTranslation();

    // INFO: correct way to check whether we are in a customer page (supports b2b)
    const router = useRouter();
    const { customerId } = router.query;
    const isCustomer = toNumberSafe(customerId) !== -1;

    const { data: editedAgreement } = useGetAgreementByIdQuery(id!, {
        skip: !id || id === -1,
    });

    const values = useMemo(
        () =>
            getValues(
                isCustomer,
                editedAgreement,
                i18n.language as TLanguageType
            ),
        [isCustomer, editedAgreement, i18n.language]
    );

    return { values, isCustomer };
};

// -------------------------------------------------------------------

interface Props extends Omit<DialogProps, "open"> {
    editedAgreementId?: number;
}

const PreparationDialog: React.FC<Props> = ({
    editedAgreementId = -1,
    ...props
}) => {
    const { t } = useTranslation();

    const [createAgreement] = useCreateAgreementMutation();
    const [updateAgreement] = useUpdateAgreementMutation();

    const { values, isCustomer } = useInitialValues(editedAgreementId);
    const shouldAutofill = editedAgreementId === -1; // Can autofill with property data *ONLY* when creating a NEW! agreement

    const cookieKey = useFormPersistStorageKey(
        "PPAgreementForm",
        editedAgreementId
    );

    const [methods, { PersistNotice }] = useFormPersist<TForm>(
        cookieKey,
        null,
        {
            dialog: true,
            resolver: zodResolver(Schema),
            values,
        }
    );

    const handleSubmit = useCallback(
        async (all: TForm) => {
            const {
                auto: _, // NOTE: we must not pass this to BE
                property,
                ...d
            } = all;

            const cb =
                editedAgreementId !== -1 ? updateAgreement : createAgreement;

            // NOTE: BE wants us to calculate signed
            const { agentSignature, commissionerSignature } =
                d?.additional || {};
            const signed = !!agentSignature && !!commissionerSignature;

            const body = {
                ...d,
                ...(d.variant === "PURCHASE" ? {} : { property }),
                signed,
            } as IAgreementReq;

            const res = await cb(body);
            if ("error" in res) return false;

            return true;
        },
        [editedAgreementId]
    );

    return (
        <FormProvider {...methods}>
            {PersistNotice}

            <Dialog
                maxWidth="lg"
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                title={<Typography>{t("Agreement")}</Typography>}
                content={
                    <Stack spacing={1}>
                        <PropertyDetails
                            isCustomer={isCustomer}
                            shouldAutofill={shouldAutofill}
                        />

                        <EditPDFButton />
                    </Stack>
                }
                DialogActionsComponent={StyledActions}
                actions={
                    <Stack spacing={1} width={1}>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="flex-end"
                        >
                            <FormControlLabel
                                label={t("Agreement date")}
                                labelPlacement="start"
                                control={
                                    <RHFDatePicker name="additional.date" />
                                }
                            />

                            <RHFCheckbox
                                name="draft"
                                label={t("Save as draft")}
                            />
                            <SubmitButton />
                            <ExportButton />
                        </Stack>
                    </Stack>
                }
                {...props}
            />
        </FormProvider>
    );
};

export default PreparationDialog;
