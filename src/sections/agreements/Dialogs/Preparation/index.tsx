// Fill-in basic information for property, customer, etc. before filling-in the actual pdf

import Dialog, { DialogProps } from "@/components/Dialog";
import { RHFCheckbox, RHFDatePicker } from "@/components/hook-form";
import { IAgreementReq } from "@/types/agreements";
import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormProvider, useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import PropertyDetails from "./PropertyDetails";
import useDialog from "@/hooks/useDialog";
import { useMemo } from "react";
import Schema from "./schema";
import {
    useCreateAgreementMutation,
    useGetAgreementByIdQuery,
    useUpdateAgreementMutation,
} from "@/services/agreements";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { TLanguageType } from "@/types/translation";
import { getValues } from "./mapper";
import { StyledActions } from "./styled";
import SubmitButton from "./Buttons/Submit";
import ExportButton from "./Buttons/Export";
import EditPDFButton from "./Buttons/EditPDF";
const PDFEditorDialog = dynamic(() => import("../PDFEditor"));

// -------------------------------------------------------------------

const useInitialValues = (id?: number) => {
    const { i18n } = useTranslation();
    const isCustomer = usePathname().includes("customer");

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

type Draft<T> = T | Partial<T>;

interface Props extends DialogProps {
    editedAgreementId?: number;
}

const PreparationDialog: React.FC<Props> = ({
    editedAgreementId,
    ...props
}) => {
    const { t } = useTranslation();

    const [createAgreement] = useCreateAgreementMutation();
    const [updateAgreement] = useUpdateAgreementMutation();

    const [isPDFOpen, openPDF, closePDF] = useDialog();

    const { values, isCustomer } = useInitialValues(editedAgreementId);
    const shouldAutofill = !editedAgreementId || editedAgreementId === -1; // Can autofill with property data *ONLY* when creating a NEW! agreement

    const methods = useForm<Draft<IAgreementReq>>({
        resolver: zodResolver(Schema),
        values,
    });

    const isPurchase = values.variant === "PURCHASE";

    console.log("ERRORS: ", methods.formState.errors);

    const handleSubmit = async ({
        auto,
        property,
        ...d
    }: Draft<IAgreementReq>) => {
        // NOTE: we must not pass this to BE
        auto;

        const cb = !!editedAgreementId ? updateAgreement : createAgreement;

        // NOTE: BE wants us to calculate signed
        const { agentSignature, commissionerSignature } = d?.additional || {};
        const signed = !!agentSignature && !!commissionerSignature;

        const body = {
            ...d,
            ...(d.variant === "PURCHASE" ? {} : { property }),
            signed,
        } as IAgreementReq;

        await cb(body);
    };

    return (
        <>
            <FormProvider {...methods}>
                <Dialog
                    {...props}
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

                            <EditPDFButton onClick={openPDF} />
                        </Stack>
                    }
                    DialogActionsComponent={StyledActions}
                    actions={
                        <>
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
                        </>
                    }
                />

                {isPDFOpen ? (
                    <PDFEditorDialog
                        open
                        suggestProperties={isPurchase}
                        onClose={closePDF}
                    />
                ) : null}
            </FormProvider>
        </>
    );
};

export default PreparationDialog;
