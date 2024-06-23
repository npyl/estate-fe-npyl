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
import { Suspense, lazy, useMemo } from "react";
import Schema, { getValues } from "./schema";
const PDFEditorDialog = lazy(() => import("../PDFEditor"));

// -------------------------------------------------------------------

const editedAgreement: IAgreement = {} as any;

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
                                <Button onClick={openPDF}>Edit PDF</Button>
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
            </FormProvider>

            {isPDFOpen ? (
                <Suspense>
                    <PDFEditorDialog
                        open
                        variant={pdfVariant}
                        onClose={closePDF}
                    />
                </Suspense>
            ) : null}
        </>
    );
};

export default PreparationDialog;
