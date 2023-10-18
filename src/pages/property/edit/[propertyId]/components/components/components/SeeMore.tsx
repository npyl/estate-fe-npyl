import { Lock, LockOpen } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { SoftButton } from "src/components/SoftButton";
import MultiFilePreviewReorder from "src/components/upload/preview/MultiFilePreviewReorder";
import { IPropertyImage } from "src/types/file";
import { Over25ImagesPreview } from "./SeeMorePreview";
import {
    useReorderPropertyImagesWithSetImageVisibilityMutation,
    useSetPropertyThumbailMutation,
} from "src/services/properties";
import { useRouter } from "next/router";

interface SeeMoreProps {
    open: boolean;
    files: IPropertyImage[];
    onImageClick: (i: IPropertyImage) => void;
    setFiles: (images: IPropertyImage[]) => void;
    onReorder: (items: string[]) => void;
    onClose: () => void;
}

// (1): See https://github.com/atlassian/react-beautiful-dnd/issues/131

export const SeeMore = ({
    open,
    files,
    onImageClick,
    setFiles,
    onReorder,
    onClose,
}: SeeMoreProps) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [setThumbnail] = useSetPropertyThumbailMutation();
    const [reorderImagesWithVisibility] =
        useReorderPropertyImagesWithSetImageVisibilityMutation();

    const [selectMultiple, setSelectMultiple] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // keys
    const toggleSelectMultiple = () => setSelectMultiple(!selectMultiple);

    const handleImageClick = (image: IPropertyImage) => {
        if (selectMultiple) {
            setSelectedImages((oldSelectedImages) => {
                const alreadySelected = oldSelectedImages.includes(image.key);

                return alreadySelected
                    ? oldSelectedImages.filter((key) => key !== image.key) // remove
                    : [...oldSelectedImages, image.key]; // add
            });
        } else {
            onImageClick && onImageClick(image);
        }
    };

    const handleReorderWithVisibility = (
        imageKeys: string[],
        imageKey: string,
        hidden: boolean
    ) => {
        reorderImagesWithVisibility({
            propertyId: +propertyId!,
            imageKeys,
            imageKey,
            hidden,
        }).then(() => {});
        // TODO: set thumbnail
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll="body" // (1)
            PaperProps={{
                style: {
                    overflow: "hidden", // (1)
                    minWidth: "95vw",
                    minHeight: "95vh",
                },
            }}
        >
            <DialogTitle
                style={{
                    position: "fixed",
                    top: 0,
                    minWidth: "95vw",
                    zIndex: 2,
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #ccc",
                    boxSizing: "border-box",
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box>
                        Edit{" "}
                        {selectMultiple
                            ? `(${selectedImages.length} selected)`
                            : ""}
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        {selectMultiple && selectedImages.length > 0 && (
                            <>
                                <Typography mr={1}>Make</Typography>
                                <SoftButton startIcon={<LockOpen />}>
                                    Public
                                </SoftButton>
                                <SoftButton startIcon={<Lock />}>
                                    Private
                                </SoftButton>
                            </>
                        )}
                        <Divider orientation="vertical" />
                        <SoftButton
                            onClick={toggleSelectMultiple}
                            color={selectMultiple ? "error" : "primary"}
                        >
                            {selectMultiple
                                ? "Cancel Select"
                                : "Select Multiple"}
                        </SoftButton>
                    </Box>
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent
                sx={{
                    overflow: "hidden", // (1)
                }}
            >
                <Box p={5}>
                    {files.length > 25 ? (
                        <Over25ImagesPreview
                            files={files}
                            selectMultiple={selectMultiple}
                            selectedImages={selectedImages}
                            setFiles={setFiles}
                            onImageClick={handleImageClick}
                            onReorder={onReorder}
                            onReorderWithVisibility={
                                handleReorderWithVisibility
                            }
                        />
                    ) : (
                        <MultiFilePreviewReorder
                            files={files}
                            selectMultiple={selectMultiple}
                            selectedImages={selectedImages}
                            columns={5}
                            thumbnail={false}
                            setFiles={setFiles}
                            onImageClick={handleImageClick}
                            onReorder={onReorder}
                        />
                    )}
                </Box>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
