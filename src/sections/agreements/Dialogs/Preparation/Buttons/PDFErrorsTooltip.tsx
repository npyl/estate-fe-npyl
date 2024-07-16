import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { TRIGGER_OPTIONS } from "../../PDFEditor/constants/trigger";
import ErrorTooltip, { ErrorTooltipProps } from "../../_shared/ErrorTooltip";
import Box from "@mui/material/Box";

interface Props extends Omit<ErrorTooltipProps, "error"> {}

const PDFErrorsTooltip: React.FC<Props> = (props) => {
    const { formState } = useFormContext();

    const havePDFErrors = useMemo(
        () =>
            Object.keys(formState.errors).some((key) =>
                TRIGGER_OPTIONS.includes(key)
            ),
        [formState]
    );

    if (havePDFErrors)
        return (
            <Box position="relative" width={24}>
                <ErrorTooltip {...props} error="Errors in PDF form" />;
            </Box>
        );

    return null;
};

export default PDFErrorsTooltip;
