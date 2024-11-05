import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { SxProps, Theme } from "@mui/material";

// --------------------------------------------------------------

const IconButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    "&:hover": {
        backgroundColor: "background.paper",
    },
    borderRadius: "16px",
    p: 0.5,
};

const ImageSx: SxProps<Theme> = {
    border: "3px solid",
    borderColor: "transparent",
    borderRadius: "18px",
    "&:hover": {
        borderColor: "neutral.300",
    },
    width: "180px",
    height: "auto",
};

interface AttachmentProps {
    src: string;
    index: number;
    onClear: (i: number) => void;
}

const Attachment: FC<AttachmentProps> = ({ src, index, onClear }) => {
    const handleClear = useCallback(() => onClear(index), []);

    return (
        <Box position="relative" sx={ImageSx}>
            <IconButton onClick={handleClear} sx={IconButtonSx}>
                <ClearIcon sx={{ fontSize: "15px" }} />
            </IconButton>

            <Image
                src={src}
                alt=""
                width={0}
                height={0}
                objectFit="contain"
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
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
