import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { SoftButton } from "src/components/SoftButton";
import MultiFilePreviewReorder from "src/components/upload/preview/MultiFilePreviewReorder";
import { IPropertyImage } from "src/types/file";

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
                // console.log("oldState: ", oldSelectedImages);

                const alreadySelected = oldSelectedImages.includes(image.key);

                // console.log(
                //     "i.key: ",
                //     image.key,
                //     " alreadySelected: ",
                //     alreadySelected
                // );

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
                Upload Images{" "}
                {selectMultiple ? `(${selectedImages.length} selected)` : ""}
                <SoftButton
                    onClick={toggleSelectMultiple}
                    sx={{
                        position: "absolute",
                        top: 1,
                        right: 1,
                        m: 1,
                    }}
                    color={selectMultiple ? "error" : "primary"}
                >
                    {selectMultiple ? "Cancel Select" : "Select Multiple"}
                </SoftButton>
            </DialogTitle>
            <DialogContent>
                <Box p={5}>
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
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
