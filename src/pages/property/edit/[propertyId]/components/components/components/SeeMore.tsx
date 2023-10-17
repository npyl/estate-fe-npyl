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

interface SeeMoreProps {
    open: boolean;
    files: IPropertyImage[];
    onImageClick: (i: IPropertyImage) => void;
    setFiles: (images: IPropertyImage[]) => void;
    onReorder: (items: string[]) => void;
    onClose: () => void;
}

export const SeeMore = ({
    open,
    files,
    onImageClick,
    setFiles,
    onReorder,
    onClose,
}: SeeMoreProps) => {
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

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: { minWidth: "95vw", minHeight: "95vh" },
            }}
        >
            <DialogTitle
                style={{
                    position: "relative",
                }}
            >
                Edit
                {selectMultiple ? `(${selectedImages.length} selected)` : ""}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box p={5}>
                    {files.length > 25 ? (
                        <Over25ImagesPreview
                            files={files}
                            selectMultiple={selectMultiple}
                            selectedImages={selectedImages}
                            setFiles={setFiles}
                            onImageClick={handleImageClick}
                            onReorder={onReorder}
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
                {selectMultiple && selectedImages.length > 0 && (
                    <>
                        <Typography mr={1}>Make</Typography>
                        <SoftButton startIcon={<LockOpen />}>Public</SoftButton>
                        <SoftButton startIcon={<Lock />}>Private</SoftButton>
                    </>
                )}
                <Divider variant="middle" />
                <SoftButton
                    onClick={toggleSelectMultiple}
                    color={selectMultiple ? "error" : "primary"}
                >
                    {selectMultiple ? "Cancel Select" : "Select Multiple"}
                </SoftButton>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
