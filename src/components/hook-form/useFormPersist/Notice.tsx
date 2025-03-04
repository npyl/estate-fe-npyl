import { FieldValues, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SoftTypography from "@/components/SoftLabel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack from "@mui/material/Stack";
import { MutableRefObject, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import useToggle from "@/hooks/useToggle";
import Button from "@mui/material/Button";
import useFormCookie from "./useFormCookie";

// -----------------------------------------------------------------------------

interface ClearButtonProps<TFieldValues extends FieldValues> {
    cookieKey: string | null;
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>;
}

const ClearButton = <TFieldValues extends FieldValues>({
    cookieKey,
    temporaryChangesRef,
}: ClearButtonProps<TFieldValues>) => {
    const { t } = useTranslation();

    const [_0, _1, remove] = useFormCookie(cookieKey);

    const handleClick = useCallback(() => {
        temporaryChangesRef.current = undefined;
        remove();
    }, []);

    return <Button onClick={handleClick}>{t("Clear")}</Button>;
};

// -----------------------------------------------------------------------------

const useContentControl = <TFieldValues extends FieldValues>(
    values: TFieldValues | undefined,
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>
) => {
    const { reset, getValues } = useFormContext<TFieldValues>();

    const [isOriginal, toggleOriginal] = useToggle(false);
    const onToggle = useCallback(() => {
        const data = isOriginal ? temporaryChangesRef.current : values;
        reset(data);
        toggleOriginal();
    }, [values, isOriginal, getValues]);

    return { isOriginal, onToggle };
};

// -----------------------------------------------------------------------------

interface NoticeProps<TFieldValues extends FieldValues> {
    cookieKey: string | null;
    values?: TFieldValues;
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>;
}

const Notice = <TFieldValues extends FieldValues>({
    cookieKey,
    values,
    temporaryChangesRef,
}: NoticeProps<TFieldValues>) => {
    const { t } = useTranslation();

    const { isOriginal, onToggle } = useContentControl(
        values,
        temporaryChangesRef
    );

    const label = !isOriginal ? t("Persisted") : t("Saved");
    const color = isOriginal ? "primary" : "warning";

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
        >
            <SoftTypography
                width="fit-content"
                p={1}
                borderRadius={1}
                textAlign="right"
                color={color}
            >
                {label}
            </SoftTypography>

            <IconButton onClick={onToggle}>
                <RestartAltIcon />
            </IconButton>

            <ClearButton
                cookieKey={cookieKey}
                temporaryChangesRef={temporaryChangesRef}
            />
        </Stack>
    );
};

export default Notice;
