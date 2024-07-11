import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import MultiFilePreviewReorder from "./MultiFilePreviewReorder";
import { IPropertyImage } from "src/types/file";
import { Over25ImagesPreview } from "./SeeMorePreview";
import {
    useBulkDeletePropertyImagesMutation,
    useBulkEditPropertyImagesMutation,
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,
} from "src/services/properties";
import { CompareGallery } from "./CompareGallery";
import usePropertyImages from "../hook";
import { styled } from "@mui/material/styles";
import Controls from "./Controls";
import useDialog from "@/hooks/useDialog";

const StyledTitle = styled(DialogTitle)({
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    minWidth: "95vw",
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
    boxSizing: "border-box",
});

interface SeeMoreProps {
    open: boolean;
    onClose: () => void;
}

// (1): See https://github.com/atlassian/react-beautiful-dnd/issues/131

const SeeMore: React.FC<SeeMoreProps> = ({ open, onClose }) => {
    const { images, propertyId } = usePropertyImages();

    const [bulkEditImages] = useBulkEditPropertyImagesMutation();
    const [bulkDeleteImages] = useBulkDeletePropertyImagesMutation();
    const [reorderImages] = useReorderPropertyImagesMutation();
    const [reorderImagesWithVisibility] =
        useReorderPropertyImagesWithSetImageVisibilityMutation();

    const [mode, setMode] = useState<"" | "multiple" | "compare">("");

    const [selectedImages, setSelectedImages] = useState<string[]>([]); // keys
    const toggleMultiple = () =>
        setMode((old) => (old === "multiple" ? "" : "multiple"));

    const [isCompareOpen, openCompareDialog, closeCompareDialog] = useDialog();
    const toggleCompare = () =>
        setMode((old) => (old === "compare" ? "" : "compare"));

    const handleImageClick = (image: IPropertyImage) => {
        setSelectedImages((oldSelectedImages) => {
            const alreadySelected = oldSelectedImages.includes(image.key);

            return alreadySelected
                ? oldSelectedImages.filter((key) => key !== image.key) // remove
                : [...oldSelectedImages, image.key]; // add
        });
    };

    const onSetMain = (key: string) => {
        const allKeys = images.map((file) => file.key);
        try {
            const keyIndex = allKeys.indexOf(key);

            // Move the selected key to the front and reorder the keys array
            const reorderedKeys = [
                key,
                ...allKeys.slice(0, keyIndex),
                ...allKeys.slice(keyIndex + 1),
            ];

            handleReorder(reorderedKeys);
        } catch (error) {
            console.error("Key not found in the array:", error);
        }
    };

    const handleReorderWithVisibility = (
        imageKeys: string[],
        imageKey: string,
        hidden: boolean
    ) =>
        reorderImagesWithVisibility({
            propertyId,
            imageKeys,
            imageKey,
            hidden,
        });

    const handleBulkChangeVisibility = useCallback(
        (hidden: boolean) =>
            bulkEditImages({
                propertyId,
                body: {
                    imageKeys: selectedImages,
                    hidden,
                },
            }),
        [selectedImages]
    );

    const findNextAvailableThumbnail = useCallback(() => {
        for (let j = 0; j < images.length; j++)
            if (!!selectedImages.find((i) => i === images[j].key)) continue;
            else return images[j].key;
        return "";
    }, [images, selectedImages]);

    const handleBulkDelete = () =>
        bulkDeleteImages({
            propertyId: +propertyId!,
            imageKeys: selectedImages,
            newThumbnailKey: findNextAvailableThumbnail(),
        });

    const handleMakePublic = () => handleBulkChangeVisibility(false);
    const handleMakePrivate = () => handleBulkChangeVisibility(true);

    const handleReorder = (items: string[]) =>
        reorderImages({ id: propertyId, body: items });

    return (
        <>
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
                <StyledTitle>
                    <Typography>
                        Edit{" "}
                        {mode === "multiple"
                            ? `(${selectedImages.length} selected)`
                            : ""}
                    </Typography>

                    <Controls
                        mode={mode}
                        selectedImages={selectedImages.length}
                        // ...
                        onToggleCompare={toggleCompare}
                        onToggleMultiple={toggleMultiple}
                        onMakePublic={handleMakePublic}
                        onMakePrivate={handleMakePrivate}
                        // ...
                        onCompare={openCompareDialog}
                        onBulkDelete={handleBulkDelete}
                        onClose={onClose}
                    />
                </StyledTitle>
                <Divider />
                <DialogContent
                    sx={{
                        overflow: "hidden", // (1)
                        mt: 5,
                        p: 5,
                    }}
                >
                    {images.length > 25 ? (
                        <Over25ImagesPreview
                            compare={mode === "compare"}
                            selectMultiple={mode === "multiple"}
                            // ...
                            selectedImages={selectedImages}
                            onImageClick={handleImageClick}
                            onReorder={handleReorder}
                            onReorderWithVisibility={
                                handleReorderWithVisibility
                            }
                        />
                    ) : (
                        <MultiFilePreviewReorder
                            selectMultiple={mode === "multiple"}
                            compare={mode === "compare"}
                            selectedImages={selectedImages}
                            // ...
                            columns={5}
                            thumbnail={false}
                            onImageClick={handleImageClick}
                            onReorder={handleReorder}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {isCompareOpen ? (
                <CompareGallery
                    open={isCompareOpen}
                    image1={selectedImages[0]}
                    image2={selectedImages[1]}
                    onClose={closeCompareDialog}
                    setMain={onSetMain}
                />
            ) : null}
        </>
    );
};

export default SeeMore;
