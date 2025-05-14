import { useFormContext, useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../types";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { SpaceBetween } from "@/components/styled";

interface AttachmentProps {
    f: File;
}

const Attachment: FC<AttachmentProps> = ({ f }) => {
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

const getAttachment = (f: File) => (
    <Attachment key={`${f.name}_${f.size}`} f={f} />
);

const Attachments = () => {
    const attachments = useWatch<TMessageBoxValues>({
        name: "attachments",
    }) as File[];
    return (
        <Stack spacing={1} p={1} maxWidth="50%">
            {attachments.map(getAttachment)}
        </Stack>
    );
};

export default Attachments;
