// @mui
import { IconButton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import FileThumbnail from "../../file-thumbnail";
import Iconify from "../../iconify";
//
import { UploadProps } from "../types";
import { useGetLabelsQuery } from "src/services/labels";
import { useMemo } from "react";
import { LabelCreate } from "src/components/label";

// ----------------------------------------------------------------------

export default function MultiFilePreview({
    thumbnail,
    files,
    supportsLabels = false,
    onRemove,
    sx,
}: UploadProps) {
    if (!files?.length) {
        return null;
    }

    const { data: labels } = useGetLabelsQuery(undefined, {
        skip: !supportsLabels,
    });

    const documentLabels = useMemo(
        () => labels?.documentLabels || [],
        [labels]
    );

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
                    <Stack
                        key={index}
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        sx={{
                            my: 1,
                            px: 1,
                            py: 0.75,
                            borderRadius: 0.75,
                            border: (theme) =>
                                `solid 1px ${theme.palette.divider}`,
                            ...sx,
                        }}
                    >
                        <FileThumbnail file={file} />

                        {"filename" in file && (
                            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                                <Typography variant="subtitle2">
                                    {file.filename}
                                </Typography>
                            </Stack>
                        )}

                        {supportsLabels && (
                            <LabelCreate
                                variant="document"
                                existingLabels={documentLabels}
                                assignedLabels={[]}
                                newLabels={[]}
                                onLabelClick={() => {}}
                                onLabelCreate={() => {}}
                                onRemoveNewLabel={() => {}}
                                onRemoveAssignedLabel={() => {}}
                            />
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
                );
            })}
        </>
    );
}
