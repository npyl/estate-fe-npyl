import { useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../types";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { SpaceBetween } from "@/components/styled";

interface AttachmentProps {
    f: File;
}

const Attachment: FC<AttachmentProps> = ({ f }) => {
    return (
        <SpaceBetween
            direction="row"
            spacing={1}
            alignItems="center"
            bgcolor="background.neutral"
            borderRadius={1}
        >
            <Typography
                variant="body2"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                888888888888888888888888888888888888888888888888888888888888888888888888
            </Typography>
            <IconButton size="small">
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
