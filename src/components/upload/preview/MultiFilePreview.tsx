// @mui
import { IconButton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import FileThumbnail from "../../file-thumbnail";
import Iconify from "../../iconify";
//
import { UploadProps } from "../types";
import {
    useAssignLabelToResourceMutation,
    useCreateLabelForResourceMutation,
    useDeleteLabelForResourceMutation,
} from "src/services/labels";
import { useMemo } from "react";
import { LabelCreate } from "src/components/label";
import { LabelResourceType } from "src/types/label";
import { properties, useGetPropertyByIdQuery } from "src/services/properties";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

const tag = "PropertyById";
const resource: LabelResourceType = "document";

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

    const router = useRouter();
    const dispatch = useDispatch();

    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);

    const assignedLabels = useMemo(
        () => property?.documents?.map((d) => d.labels).flat() || [],
        [property]
    );

    const [assignLabel] = useAssignLabelToResourceMutation();
    const [createAssignLabel] = useCreateLabelForResourceMutation();
    const [removeLabel] = useDeleteLabelForResourceMutation();

    const invalidateTags = () =>
        dispatch(properties.util.invalidateTags([tag]));

    const handleAssignLabel = (labelId: number, documentId: number) =>
        assignLabel({ resource, resourceId: documentId, labelId }).then(
            invalidateTags
        );

    const handleCreateLabel = () => {};

    const handleRemoveLabel = (i: number) => {};

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
                                assignedLabels={assignedLabels}
                                onLabelClick={({ id }) =>
                                    handleAssignLabel(id, file.id)
                                }
                                onLabelCreate={() => handleCreateLabel}
                                onRemoveAssignedLabel={handleRemoveLabel}
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
