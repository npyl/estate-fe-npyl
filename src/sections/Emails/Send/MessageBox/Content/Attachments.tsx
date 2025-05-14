import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../types";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { SpaceBetween } from "@/components/styled";

interface AttachmentProps {
    idx: number;
}

const Attachment: FC<AttachmentProps> = ({ idx }) => {
    const f = useWatch<TMessageBoxValues>({
        name: `attachments.${idx}`,
    }) as File;
    const old = useWatch<TMessageBoxValues>({ name: "attachments" }) as File[];
    const { setValue } = useFormContext<TMessageBoxValues>();

    const onDelete = useCallback(() => {
        const filtered = old.filter(({ name }) => f.name !== name);
        setValue("attachments", filtered, { shouldDirty: true });
    }, [old]);

    return (
        <SpaceBetween
            direction="row"
            spacing={1}
            alignItems="center"
            bgcolor="background.neutral"
            borderRadius={1}
            pl={1}
        >
            <Typography
                variant="body2"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {f.name}
            </Typography>
            <IconButton size="small" onClick={onDelete}>
                <ClearIcon fontSize="small" />
            </IconButton>
        </SpaceBetween>
    );
};

const getAttachment = (f: Record<"id", string>, idx: number) => (
    <Attachment key={f.id} idx={idx} />
);

const Attachments = () => {
    const { fields } = useFieldArray({ name: "attachments" });
    return (
        <Stack spacing={1} p={1} maxWidth="50%">
            {fields.map(getAttachment)}
        </Stack>
    );
};

export default Attachments;
