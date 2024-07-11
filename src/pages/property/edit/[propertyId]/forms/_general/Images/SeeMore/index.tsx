import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { IPropertyImage } from "src/types/file";
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
import SelectableItem from "./Selectable";
import MultiFilePreviewReorder from "./PreviewReorder/Normal";
import { Over25ImagesPreview } from "./PreviewReorder/Over25";

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

    const handleImageClick = (image: IPropertyImage) =>
        setSelectedImages((oldSelectedImages) => {
            const alreadySelected = oldSelectedImages.includes(image.key);

            return alreadySelected
                ? oldSelectedImages.filter((key) => key !== image.key) // remove
                : [...oldSelectedImages, image.key]; // add
        });

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

    const createItem = useCallback(
        (f: IPropertyImage, index: number) => {
            const isSelected =
                selectedImages.findIndex((key) => key === f.key) > -1;

            return {
                id: index,
                value: (
                    <SelectableItem
                        selectMultiple={mode === "multiple"}
                        compare={mode === "compare"}
                        selected={isSelected}
                        image={f}
                        onClick={() => handleImageClick(f)}
                    />
                ),
            };
        },
        [mode, selectedImages]
    );

    const { items, publicImages, privateImages } = useMemo(
        () => ({
            items: images.length <= 25 ? images.map(createItem) : [],

            publicImages:
                images.length > 25
                    ? images.filter((f) => !f.hidden).map(createItem)
                    : [],
            privateImages:
                images.length > 25
                    ? images.filter((f) => f.hidden).map(createItem)
                    : [],
        }),
        [images, createItem]
    );

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
                            publicImages={publicImages}
                            privateImages={privateImages}
                            onReorder={handleReorder}
                            onReorderWithVisibility={
                                handleReorderWithVisibility
                            }
                        />
                    ) : (
                        <MultiFilePreviewReorder
                            items={items}
                            columns={5}
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
