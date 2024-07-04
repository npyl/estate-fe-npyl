import { Lock, LockOpen } from "@mui/icons-material";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { SoftButton } from "src/components/SoftButton";
import MultiFilePreviewReorder from "./MultiFilePreviewReorder";
import { IPropertyImage } from "src/types/file";
import { Over25ImagesPreview } from "./SeeMorePreview";
import {
    useBulkDeletePropertyImagesMutation,
    useBulkEditPropertyImagesMutation,
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,
} from "src/services/properties";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { CompareGallery } from "./CompareGallery";
import usePropertyImages from "../hook";
import { styled } from "@mui/material/styles";

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

    const [selectMultiple, setSelectMultiple] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // keys
    const toggleSelectMultiple = () => setSelectMultiple(!selectMultiple);

    const [compare, setCompare] = useState(false);
    const [compareImages, setCompareImages] = useState<string[]>([]); // keys
    const [compareImage1, setCompareImage1] = useState<IPropertyImage | null>(
        null
    );
    const [compareImage2, setCompareImage2] = useState<IPropertyImage | null>(
        null
    );

    const [compareGalleryOpen, setCompareGalleryOpen] = useState(false);
    const toggleCompare = () => setCompare(!compare);
    const closeCompareGallery = () => setCompareGalleryOpen(false);

    const handleCompareBtnClick = () => {
        setCompareImage1(
            images.find((image) => image.key === compareImages[0]) || null
        );
        setCompareImage2(
            images.find((image) => image.key === compareImages[1]) || null
        );
        setCompareGalleryOpen(true);
    };

    const handleImageClick = (image: IPropertyImage) => {
        if (selectMultiple) {
            setSelectedImages((oldSelectedImages) => {
                const alreadySelected = oldSelectedImages.includes(image.key);

                return alreadySelected
                    ? oldSelectedImages.filter((key) => key !== image.key) // remove
                    : [...oldSelectedImages, image.key]; // add
            });
        } else if (compare) {
            if (compareImages.includes(image.key)) {
                // If the image.key is already in the array, remove it
                setCompareImages((prevImages) =>
                    prevImages.filter((key) => key !== image.key)
                );
            } else if (compareImages.length < 2) {
                // If less than 2 images are selected, add the new image
                setCompareImages((prevImages) => [...prevImages, image.key]);
            } else {
                // Replace the first selected image with the new image, and keep the second selected image as is
                setCompareImages((prevImages) => [prevImages[1], image.key]);
            }
        }
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

    const handleBulkDelete = useCallback(
        () =>
            bulkDeleteImages({
                propertyId: +propertyId!,
                imageKeys: selectedImages,
                newThumbnailKey: findNextAvailableThumbnail(),
            }),
        [selectedImages]
    );

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
                                <SoftButton
                                    startIcon={<LockOpen />}
                                    onClick={handleMakePublic}
                                >
                                    Public
                                </SoftButton>
                                <SoftButton
                                    startIcon={<Lock />}
                                    onClick={handleMakePrivate}
                                >
                                    Private
                                </SoftButton>
                                <SoftButton
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleBulkDelete}
                                >
                                    Delete
                                </SoftButton>
                            </>
                        )}
                        {compare === false && (
                            <>
                                <Divider orientation="vertical" />
                                <SoftButton
                                    onClick={toggleSelectMultiple}
                                    variant="outlined"
                                    color={selectMultiple ? "error" : "primary"}
                                >
                                    {selectMultiple
                                        ? "Cancel Select"
                                        : "Select Multiple"}
                                </SoftButton>
                            </>
                        )}
                        {compare === true && compareImages.length === 2 && (
                            <>
                                <SoftButton
                                    color="primary"
                                    onClick={handleCompareBtnClick}
                                >
                                    Compare
                                </SoftButton>
                            </>
                        )}
                        {selectMultiple === false && (
                            <>
                                <Divider orientation="vertical" />
                                <SoftButton
                                    onClick={toggleCompare}
                                    variant="outlined"
                                    color={compare ? "error" : "primary"}
                                >
                                    {compare ? "Close" : "Compare Mode"}
                                </SoftButton>
                            </>
                        )}

                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
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
                            selectMultiple={selectMultiple}
                            selectedImages={selectedImages}
                            compare={compare}
                            compareImages={compareImages}
                            onImageClick={handleImageClick}
                            onReorder={handleReorder}
                            onReorderWithVisibility={
                                handleReorderWithVisibility
                            }
                        />
                    ) : (
                        <MultiFilePreviewReorder
                            selectMultiple={selectMultiple}
                            selectedImages={selectedImages}
                            compare={compare}
                            compareImages={compareImages}
                            columns={5}
                            thumbnail={false}
                            onImageClick={handleImageClick}
                            onReorder={handleReorder}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {compareImage1 && compareImage2 && (
                <CompareGallery
                    open={compareGalleryOpen}
                    image1={compareImage1}
                    image2={compareImage2}
                    onClose={closeCompareGallery}
                    setMain={onSetMain}
                />
            )}
        </>
    );
};

export default SeeMore;
