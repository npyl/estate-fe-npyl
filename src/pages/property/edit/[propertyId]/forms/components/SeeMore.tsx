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
import MultiFilePreviewReorder from "src/components/upload/preview/MultiFilePreviewReorder";
import { IPropertyImage } from "src/types/file";
import { Over25ImagesPreview } from "./SeeMorePreview";
import {
    useBulkDeletePropertyImagesMutation,
    useBulkEditPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,
} from "src/services/properties";
import { useRouter } from "next/router";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ProgressBar } from "./ProgressBar";
import { CompareGallery } from "./CompareGallery";

interface SeeMoreProps {
    open: boolean;
    files: IPropertyImage[];
    onImageClick: (i: IPropertyImage) => void;
    onReorder: (items: string[]) => void;
    onClose: () => void;
}

// (1): See https://github.com/atlassian/react-beautiful-dnd/issues/131

export const SeeMore = ({
    open,
    files,
    onImageClick,
    onReorder,
    onClose,
}: SeeMoreProps) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [bulkEditImages] = useBulkEditPropertyImagesMutation();
    const [bulkDeleteImages] = useBulkDeletePropertyImagesMutation();
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
            files.find((image) => image.key === compareImages[0]) || null
        );
        setCompareImage2(
            files.find((image) => image.key === compareImages[1]) || null
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
        } else {
            onImageClick && onImageClick(image);
        }
    };

    const onSetMain = (key: string) => {
        const allKeys = files.map((file) => file.key);
        try {
            const keyIndex = allKeys.indexOf(key);

            // Move the selected key to the front and reorder the keys array
            const reorderedKeys = [
                key,
                ...allKeys.slice(0, keyIndex),
                ...allKeys.slice(keyIndex + 1),
            ];

            onReorder(reorderedKeys);
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
            propertyId: +propertyId!,
            imageKeys,
            imageKey,
            hidden,
        });

    const handleBulkChangeVisibility = useCallback(
        (hidden: boolean) =>
            bulkEditImages({
                propertyId: +propertyId!,
                body: {
                    imageKeys: selectedImages,
                    hidden,
                },
            }),
        [selectedImages]
    );

    const findNextAvailableThumbnail = useCallback(() => {
        for (let j = 0; j < files.length; j++)
            if (!!selectedImages.find((i) => i === files[j].key)) continue;
            else return files[j].key;
        return "";
    }, [files, selectedImages]);

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
                <DialogTitle
                    style={{
                        position: "fixed",
                        top: 0,
                        minWidth: "95vw",
                        zIndex: 2,
                        backgroundColor: "#fff",
                        borderBottom: "1px solid #ccc",
                        padding: 7,
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
                                        color={
                                            selectMultiple ? "error" : "primary"
                                        }
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

                            <IconButton
                                onClick={() => onClose()}
                                sx={{
                                    color: "grey",
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
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
                                compare={compare}
                                compareImages={compareImages}
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
                                compare={compare}
                                compareImages={compareImages}
                                columns={5}
                                thumbnail={false}
                                onImageClick={handleImageClick}
                                onReorder={onReorder}
                            />
                        )}
                    </Box>
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
