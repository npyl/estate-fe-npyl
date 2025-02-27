import { FieldValues, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SoftTypography from "@/components/SoftLabel";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack from "@mui/material/Stack";
import { MutableRefObject, useCallback, useState } from "react";

const useContentControl = <TFieldValues extends FieldValues>(
    values: TFieldValues | undefined,
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>
) => {
    const { reset, getValues } = useFormContext<TFieldValues>();

    const [isOriginal, setOriginal] = useState(false);
    const onToggle = useCallback(() => {
        if (isOriginal) {
            reset(temporaryChangesRef.current);
            setOriginal(false);
        } else {
            // INFO: we are toggling a "Persisted" view; therefore make sure we save any temporary changes the user made
            temporaryChangesRef.current = getValues();
            reset(values);
            setOriginal(true);
        }
    }, [values, isOriginal, getValues]);

    return { isOriginal, onToggle };
};

interface NoticeProps<TFieldValues extends FieldValues> {
    values?: TFieldValues;
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>;
}

const Notice = <TFieldValues extends FieldValues>({
    values,
    temporaryChangesRef,
}: NoticeProps<TFieldValues>) => {
    const { t } = useTranslation();

    const { isOriginal, onToggle } = useContentControl(
        values,
        temporaryChangesRef
    );

    const label0 = !isOriginal ? t("Persisted") : t("Original");
    const label1 = isOriginal ? t("Persisted") : t("Original");

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifySelf="flex-end"
        >
            <SoftTypography
                width="fit-content"
                p={1}
                borderRadius={1}
                textAlign="right"
            >
                {label0}
            </SoftTypography>

            <Button
                sx={{ ml: 1 }}
                startIcon={<RestartAltIcon />}
                onClick={onToggle}
            >
                {label1}
            </Button>
        </Stack>
    );
};

export default Notice;
