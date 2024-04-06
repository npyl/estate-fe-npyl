// @mui
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import FileThumbnail from "../../file-thumbnail";
import Iconify from "../../iconify";
//
import { IPropertyFile, UploadProps, UploadVariant } from "../types";
import { LabelCreate } from "@/components/Label";
import { motion } from "framer-motion";
import { DocumentIcon } from "./DocumentIcon";

// ----------------------------------------------------------------------

interface ItemProps {
    variant: UploadVariant;
    file: IPropertyFile;
    onClick?: (f: IPropertyFile) => void;
    onRemove?: (f: IPropertyFile) => void;
}

const variants = {
    initial: {
        backgroundColor: "transparent",
        transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
        backgroundColor: "#f0f0f0",
        transition: { duration: 0.8, ease: "easeIn" },
    },
    pressed: {
        scale: 0.995,
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

const Item = ({ variant, file, onClick, onRemove }: ItemProps) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove && onRemove(file);
    };

    return (
        <motion.div
            whileHover="hover"
            whileTap="pressed"
            variants={variants}
            onClick={() => onClick && onClick(file)}
        >
            <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{
                    my: 1,
                    px: 1,
                    py: 0.75,
                    borderRadius: 0.75,
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
            >
                {variant === "image" && <FileThumbnail file={file} />}
                {variant === "document" && (
                    <DocumentIcon
                        isPreview={!file.url}
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />
                )}

                {"filename" in file && (
                    <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2">
                            {file.filename}
                        </Typography>
                    </Stack>
                )}

                {variant === "document" && file.url && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <LabelCreate variant="document" resourceId={file.id} />
                    </div>
                )}

                {onRemove && file.url && (
                    <IconButton edge="end" size="small" onClick={handleRemove}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                )}
            </Stack>
        </motion.div>
    );
};

export default function MultiFilePreview({
    thumbnail,
    files,
    variant,
    onFileClick,
    onRemove,
    sx,
}: UploadProps) {
    if (!files?.length) {
        return null;
    }

    return (
        <>
            {files.map((file, index) => {
                return thumbnail ? (
                    <Stack
                        key={index}
                        alignItems="center"
                        display="inline-flex"
                        justifyContent="center"
                        sx={{
                            m: 0.5,
                            width: 80,
                            height: 80,
                            borderRadius: 1.25,
                            overflow: "hidden",
                            position: "relative",
                            border: (theme) =>
                                `solid 1px ${theme.palette.divider}`,
                            ...sx,
                        }}
                    >
                        <FileThumbnail
                            tooltip
                            imageView
                            file={file}
                            sx={{ position: "absolute" }}
                            imgSx={{ position: "absolute" }}
                        />

                        {onRemove && (
                            <IconButton
                                size="small"
                                onClick={() => onRemove(file)}
                                sx={{
                                    top: 4,
                                    right: 4,
                                    p: "1px",
                                    position: "absolute",
                                    color: (theme) =>
                                        alpha(theme.palette.common.white, 0.72),
                                    bgcolor: (theme) =>
                                        alpha(theme.palette.grey[900], 0.48),
                                    "&:hover": {
                                        bgcolor: (theme) =>
                                            alpha(
                                                theme.palette.grey[900],
                                                0.72
                                            ),
                                    },
                                }}
                            >
                                <Iconify icon="eva:close-fill" width={16} />
                            </IconButton>
                        )}
                    </Stack>
                ) : (
                    <Item
                        key={index}
                        variant={variant}
                        file={file}
                        onClick={onFileClick}
                        onRemove={onRemove}
                    />
                );
            })}
        </>
    );
}
