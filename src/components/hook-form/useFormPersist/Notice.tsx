import { FieldValues, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SoftTypography from "@/components/SoftLabel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC, MutableRefObject, useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { SxProps, Theme } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";

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

const getContainerSx = (dialog: boolean): SxProps<Theme> => ({
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
    //
    position: dialog ? "fixed" : "unset",
    top: 0,
    right: 0,
    zIndex: ({ zIndex }) => zIndex.modal + 1,
    bgcolor: dialog ? "background.paper" : "unset",
    border: dialog ? "1px solid" : "none",
    borderColor: getBorderColor2,
    borderRadius: 1,
    p: dialog ? 0.5 : 0,
    m: dialog ? 1 : 0,
});

interface ContainerProps extends StackProps {
    dialog: boolean;
}

const Container: FC<ContainerProps> = ({ dialog, sx, ...props }) => (
    <Stack sx={{ ...(getContainerSx(dialog) as any), ...sx }} {...props} />
);

// -----------------------------------------------------------------------------

interface NoticeProps<TFieldValues extends FieldValues> {
    dialog: boolean;
    values?: TFieldValues;
    temporaryChangesRef: MutableRefObject<TFieldValues | undefined>;
    onRemove: VoidFunction;
}

const Notice = <TFieldValues extends FieldValues>({
    dialog,
    values,
    temporaryChangesRef,
    onRemove,
}: NoticeProps<TFieldValues>) => {
    const { t } = useTranslation();

    const { isOriginal, onToggle } = useContentControl(
        values,
        temporaryChangesRef
    );

    const label = !isOriginal ? t("Persisted") : t("Saved");
    const color = isOriginal ? "primary" : "warning";

    return (
        <Container dialog={dialog}>
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
        </Container>
    );
};

export default Notice;
