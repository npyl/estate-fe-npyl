// Fill-in basic information for property, customer, etc. before filling-in the actual pdf

import Dialog, { DialogProps } from "@/components/Dialog";
import { RHFCheckbox } from "@/components/hook-form";
import { IAgreement, IAgreementReq } from "@/types/agreements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import PropertyDetails from "./PropertyDetails";
import ButtonGroup from "./ButtonGroup";
import useDialog from "@/hooks/useDialog";
import { Suspense, lazy, useMemo, useState } from "react";
import Schema, { getValues } from "./schema";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { TLanguageType } from "@/types/translation";
const PDFEditorDialog = lazy(() => import("../PDFEditor"));

// -------------------------------------------------------------------

const editedAgreement: IAgreement = {
    owner: {
        fullname: "hello",
    },
    property: {
        livingSpace: 10,
    },
} as any;

interface Props extends DialogProps {
    editedAgreementId?: number;
}

const PreparationDialog: React.FC<Props> = ({
    editedAgreementId,
    ...props
}) => {
    const { t } = useTranslation();

    const [isPDFOpen, openPDF, closePDF] = useDialog();

    // const { data: editedAgreement } = useGetAgreementByIdQuery(
    //     editedAgreementId,
    //     { skip: !(editedAgreement >= 0) }
    // );

    const values = useMemo(() => getValues(editedAgreement), [editedAgreement]);

    const methods = useForm<IAgreementReq>({
        resolver: yupResolver(Schema),
        values,
    });

    const [lang, setLang] = useState<TLanguageType>("el");
    const pdfVariant = methods.watch("variant");

    const handleSubmit = () => {};

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
                                <ButtonGroup />

                                <LanguageButton
                                    updatesGlobalLanguage={false}
                                    language={lang}
                                    onLanguageChange={setLang}
                                />

                                <Button onClick={openPDF}>
                                    {t("Edit PDF")}
                                </Button>
                            </Stack>
                            <PropertyDetails />
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
                            <Button type="submit">{t("Save")}</Button>
                        </>
                    }
                />

                {isPDFOpen ? (
                    <Suspense>
                        <PDFEditorDialog
                            open
                            // ...
                            variant={pdfVariant}
                            lang={lang}
                            // ...
                            onClose={closePDF}
                        />
                    </Suspense>
                ) : null}
            </FormProvider>
        </>
    );
};

export default PreparationDialog;
