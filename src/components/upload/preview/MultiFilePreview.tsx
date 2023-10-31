// @mui
import {
    CircularProgress,
    IconButton,
    Stack,
    Typography,
    createSvgIcon,
    SvgIconProps,
    Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import FileThumbnail from "../../file-thumbnail";
import Iconify from "../../iconify";
//
import { IPropertyFile, UploadProps, UploadVariant } from "../types";
import { LabelCreate } from "src/components/label";
import { motion } from "framer-motion";

// ----------------------------------------------------------------------

// First, create the icon with createSvgIcon
const DocumentSvg = createSvgIcon(
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 2H14L20 8V22C20 23.1 19.1 24 18 24H6C4.9 24 4 23.1 4 22V4C4 2.9 4.9 2 6 2Z"
            fill="currentColor"
        />
        <path d="M13 9V3.5L18.5 9H13Z" fill="currentColor" />
    </svg>,
    "DocumentIcon"
);

interface DocumentIconProps extends SvgIconProps {
    isPreview: boolean;
}

const DocumentIcon = ({ isPreview, ...other }: DocumentIconProps) => {
    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <DocumentSvg {...other} />
            {isPreview && (
                <CircularProgress
                    sx={{
                        position: "absolute",
                        top: "calc(50% - 20px)",
                        left: "calc(50% - 20px)",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    );
};

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

                {variant === "document" && (
                    <LabelCreate variant="document" resourceId={file.id} />
                )}

                {onRemove && (
                    <IconButton
                        edge="end"
                        size="small"
                        onClick={() => onRemove(file)}
                    >
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
