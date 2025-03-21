import { FieldValues, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SoftTypography from "@/components/SoftLabel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack from "@mui/material/Stack";
import { MutableRefObject, useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

// -----------------------------------------------------------------------------

interface ClearButtonProps {
    onRemove: VoidFunction;
}

const ClearButton = ({ onRemove }: ClearButtonProps) => (
    <IconButton onClick={onRemove}>
        <DeleteIcon />
    </IconButton>
);

// -----------------------------------------------------------------------------

const useContentControl = <TFieldValues extends FieldValues>(
    values: TFieldValues | undefined,
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>
) => {
    const { reset } = useFormContext<TFieldValues>();

    const [isOriginal, setOriginal] = useState(false);
    const onToggle = useCallback(() => {
        const data = isOriginal ? temporaryChangesRef.current : values;
        reset(data);
        setOriginal(!isOriginal);
    }, [values, isOriginal]);

    return { isOriginal, onToggle };
};

// -----------------------------------------------------------------------------

interface NoticeProps<TFieldValues extends FieldValues> {
    values?: TFieldValues;
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>;
    onRemove: VoidFunction;
}

const Notice = <TFieldValues extends FieldValues>({
    onRemove,
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

            {!isOriginal ? (
                <>
                    <ClearButton onRemove={onRemove} />
                    <Divider orientation="vertical" flexItem />
                </>
            ) : null}

            <IconButton onClick={onToggle}>
                <RestartAltIcon />
            </IconButton>
        </Stack>
    );
};

export default Notice;
