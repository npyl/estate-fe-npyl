import React, { useMemo } from "react";
import { FieldPath, useFormContext, useWatch } from "react-hook-form";
import { getTRIGGER_OPTIONS } from "../../../PDFEditor/constants/trigger";
import ErrorTooltip, { ErrorTooltipProps } from "../../../_shared/ErrorTooltip";
import Box from "@mui/material/Box";
import { IAgreementType } from "@/types/agreements";
import { useTranslation } from "react-i18next";
import { TForm } from "../../types";

interface Props extends Omit<ErrorTooltipProps, "error"> {}

const PDFErrorsTooltip: React.FC<Props> = (props) => {
    const { t } = useTranslation();

    const { formState } = useFormContext<TForm>();

    const variant = useWatch({ name: "variant" }) as IAgreementType;

    const TRIGGER_OPTIONS = useMemo(
        () => getTRIGGER_OPTIONS(variant),
        [variant]
    );

    const havePDFErrors = useMemo(
        () =>
            Object.keys(formState.errors).some((key) =>
                TRIGGER_OPTIONS.includes(key as FieldPath<TForm>)
            ),
        [formState, TRIGGER_OPTIONS]
    );

    if (havePDFErrors)
        return (
            <Box position="relative" width={24}>
                <ErrorTooltip {...props} error={t("Errors in PDF form")} />
            </Box>
        );

    return null;
};

export default PDFErrorsTooltip;
