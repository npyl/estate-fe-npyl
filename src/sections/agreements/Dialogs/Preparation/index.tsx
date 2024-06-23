// Fill-in basic information for property, customer, etc. before filling-in the actual pdf

import Dialog, { DialogProps } from "@/components/Dialog";
import { RHFCheckbox } from "@/components/hook-form";
import { IAgreementReq } from "@/types/agreements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import PropertyDetails from "./PropertyDetails";
import ButtonGroup from "./ButtonGroup";

const Schema = yup.object<IAgreementReq>().shape({
    variant: yup.string().oneOf(["basic", "purchase"]).required(),
    draft: yup.boolean().required(),
    keys: yup.boolean().required(),
    title: yup.string().required(),
    startingDate: yup.string().required(),
    expirationDate: yup.string().required(),
    availableAfter: yup.string().required(),
    // ...
    manager: yup.object({
        fullname: yup.string().required(),
        title: yup.string().required(),
        vat: yup.string().required(),
        taxOffice: yup.string().required(),
        genComReg: yup.string().required(), // ΓΕΜΗ
    }),
    company: yup.object({
        address: yup.string().required(),
        homePhone: yup.string().required(),
        mobilePhone: yup.string().required(),
        email: yup.string().required(),
    }),
    owner: yup.object({
        fullname: yup.string().required(),
        email: yup.string().required(),
        maidenName: yup.string().required(),
        idCardNo: yup.string().required(),
        mobilePhone: yup.string().required(),
        vat: yup.string().required(),
        // ...
        city: yup.string().required(),
        street: yup.string().required(),
        number: yup.string().required(),
        // ...
        actingOnMyBehalfFiller: yup.string().required(),
    }),
    property: yup.object({
        area: yup.number().required(),
        address: yup.string().required(),
        addressNo: yup.string().required(),
        type: yup.string().required(),
        floor: yup.number().required(),
        livingSpace: yup.number().required(),
        description: yup.string().required(),
        price: yup.number().required(),
    }),
    commissionAndDuration: yup.object({
        flatRate: yup.number().required(),
        percentage: yup.number().required(),
        months: yup.number().required(),
        defects: yup.string().required(),
    }),
    gdpr: yup.boolean().required(),
    additional: yup.object({
        date: yup.string().required(),
        commisionerSignature: yup.string().required(),
        agentSignature: yup.string().required(),
    }),
});

// -------------------------------------------------------------------

interface Props extends DialogProps {
    onSave: () => void;
}

const PreparationDialog: React.FC<Props> = ({ onSave, ...props }) => {
    const { t } = useTranslation();

    const methods = useForm<IAgreementReq>({
        resolver: yupResolver(Schema),
        values: {} as any,
    });

    const handleSubmit = () => {};

    return (
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
                        <ButtonGroup />
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
                        <Button type="submit">{t("Save")}</Button>
                    </>
                }
            />
        </FormProvider>
    );
};

export default PreparationDialog;
