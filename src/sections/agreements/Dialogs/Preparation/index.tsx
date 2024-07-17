// Fill-in basic information for property, customer, etc. before filling-in the actual pdf

import Dialog, { DialogProps } from "@/components/Dialog";
import { RHFCheckbox } from "@/components/hook-form";
import { IAgreementReq } from "@/types/agreements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import PropertyDetails from "./PropertyDetails";
import useDialog from "@/hooks/useDialog";
import { useCallback, useMemo } from "react";
import Schema, { getValues } from "./schema";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { TLanguageType } from "@/types/translation";
import {
    useCreateAgreementMutation,
    useGetAgreementByIdQuery,
    useUpdateAgreementMutation,
} from "@/services/agreements";
import dynamic from "next/dynamic";
import {
    ButtonGroup,
    EditPDFButton,
    ExportButton,
    SubmitButton,
} from "./Buttons";
import { usePathname } from "next/navigation";
const PDFEditorDialog = dynamic(() => import("../PDFEditor"));

// -------------------------------------------------------------------

const useInitialValues = (id?: number) => {
    const isCustomer = usePathname().includes("customer");

    const { data: editedAgreement } = useGetAgreementByIdQuery(id!, {
        skip: !id || id === -1,
    });

    const values = useMemo(
        () => getValues(isCustomer, editedAgreement),
        [isCustomer, editedAgreement]
    );

    return { values, isCustomer };
};

// -------------------------------------------------------------------

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

    const methods = useForm<IAgreementReq>({
        resolver: yupResolver(Schema),
        values,
    });

    const lang = (methods.watch("lang") as TLanguageType) || "el";

    const setLang = useCallback(
        (l: TLanguageType) => methods.setValue("lang", l),
        []
    );

    const handleSubmit = async (d: IAgreementReq) => {
        const cb = d.id ? updateAgreement : createAgreement;
        await cb(d);
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
                            <Stack direction="row" spacing={1}>
                                {!isCustomer ? <ButtonGroup /> : null}

                                <LanguageButton
                                    updatesGlobalLanguage={false}
                                    language={lang}
                                    onLanguageChange={setLang}
                                />

                                <EditPDFButton onClick={openPDF} />
                            </Stack>

                            <PropertyDetails shouldAutofill={shouldAutofill} />

                            <RHFCheckbox
                                labelPlacement="start"
                                name="keys"
                                label={t("Keys")}
                            />
                        </Stack>
                    }
                    actions={
                        <>
                            <RHFCheckbox name="draft" label="Save as draft" />
                            <SubmitButton />
                            <ExportButton />
                        </>
                    }
                />

                {isPDFOpen ? <PDFEditorDialog open onClose={closePDF} /> : null}
            </FormProvider>
        </>
    );
};

export default PreparationDialog;
