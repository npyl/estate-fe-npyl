import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { IPropertyImage } from "src/types/file";
import { CompareGallery } from "./CompareGallery";
import { styled } from "@mui/material/styles";
import Controls from "./Controls";
import useDialog from "@/hooks/useDialog";
import Content from "./Content";
import SelectableItem from "./Content/Selectable";

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
    const [mode, setMode] = useState<"" | "multiple" | "compare">("");

    const [selectedImages, setSelectedImages] = useState<string[]>([]); // keys
    const toggleMultiple = () =>
        setMode((old) => (old === "multiple" ? "" : "multiple"));

    const [isCompareOpen, openCompareDialog, closeCompareDialog] = useDialog();
    const toggleCompare = () =>
        setMode((old) => (old === "compare" ? "" : "compare"));

    const handleImageClick = (image: IPropertyImage) =>
        setSelectedImages((old) => {
            const isAlreadySelected = old.includes(image.key);

            return isAlreadySelected
                ? old.filter((key) => key !== image.key) // remove
                : mode === "multiple" || (mode === "compare" && old.length < 2) // add
                ? [...old, image.key]
                : old;
        });

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
                        selectedImages={selectedImages}
                        // ...
                        onToggleCompare={toggleCompare}
                        onToggleMultiple={toggleMultiple}
                        // ...
                        onCompare={openCompareDialog}
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
                    <Content createItemCb={createItem} />
                </DialogContent>
            </Dialog>

            {isCompareOpen ? (
                <CompareGallery
                    open={isCompareOpen}
                    image1={selectedImages[0]}
                    image2={selectedImages[1]}
                    onClose={closeCompareDialog}
                />
            ) : null}
        </>
    );
};

export default SeeMore;
