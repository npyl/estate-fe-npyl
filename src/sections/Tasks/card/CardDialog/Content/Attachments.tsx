import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

// --------------------------------------------------------------

const IconButtonSx = {
    position: "absolute",
    top: -2,
    right: -2,
};

interface AttachmentProps {
    src: string;
    index: number;
    onClear: (i: number) => void;
}

const Attachment: FC<AttachmentProps> = ({ src, index, onClear }) => {
    const handleClear = useCallback(() => onClear(index), []);

    return (
        <Box position="relative">
            <IconButton onClick={handleClear} sx={IconButtonSx}>
                <ClearIcon />
            </IconButton>

            <Image
                src={src}
                alt=""
                width={0}
                height={0}
                style={{
                    width: "150px",
                    height: "auto",
                    objectFit: "contain",
                }}
            />
        </Box>
    );
};

// --------------------------------------------------------------

const getAttachment =
    (onClear: (idx: number) => void) => (s: string, idx: number) =>
        <Attachment key={idx} index={idx} src={s} onClear={onClear} />;

// --------------------------------------------------------------

const attachmentsKey = "attachments";

const Attachments = () => {
    const { watch, setValue } = useFormContext();

    const attachments = (watch(attachmentsKey) as string[]) || [];

    const handleClear = useCallback((idx: number) => {
        const current = (watch(attachmentsKey) as string[]) || [];
        const filtered = current.filter((_, i) => i !== idx);
        setValue(attachmentsKey, filtered);
    }, []);

    return (
        <Stack direction="row" spacing={1} flexWrap="wrap">
            {attachments.map(getAttachment(handleClear))}
        </Stack>
    );
};

export default Attachments;
