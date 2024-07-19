import { Dialog, DialogContent, Divider, PaperProps } from "@mui/material";
import { useCallback, useState } from "react";
import { IPropertyImage } from "src/types/file";
import { CompareGallery } from "./CompareGallery";
import Controls from "./Controls";
import useDialog from "@/hooks/useDialog";
import SelectableItem from "./Content/Selectable";
import { StyledTitle } from "./styled";
import { TListingTab, TMode } from "./types";
import { styled } from "@mui/material/styles";
import usePropertyImages from "../hook";
import Tabs from "./Tabs";
import Content from "./Content";

// (1): See https://github.com/atlassian/react-beautiful-dnd/issues/131

const DialogPaperProps: PaperProps = {
    sx: {
        overflow: "hidden", // (1)
        minWidth: "95vw",
        minHeight: "95vh",
    },
};

const StyledContent = styled(DialogContent)(({ theme }) => ({
    overflow: "hidden", // (1)
    marginTop: theme.spacing(3),
}));

interface SeeMoreProps {
    open: boolean;
    onClose: () => void;
}

const SeeMore: React.FC<SeeMoreProps> = ({ open, onClose }) => {
    const { images } = usePropertyImages();

    const [tab, setTab] = useState<TListingTab>("CRM");

    const [mode, setMode] = useState<"" | "multiple" | "compare">("");
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // keys

    const [isCompareOpen, openCompareDialog, closeCompareDialog] = useDialog();

    const isAllSelected =
        selectedImages.length > 0 &&
        images.length > 0 &&
        selectedImages.length === images.length;

    const handleImageClick = (imageKey: string) =>
        setSelectedImages((old) => {
            const isAlreadySelected = old.includes(imageKey);

            return isAlreadySelected
                ? old.filter((key) => key !== imageKey) // remove
                : mode === "multiple" || (mode === "compare" && old.length < 2) // add
                ? [...old, imageKey]
                : old;
        });

    const handleModeChange = (m: TMode) => {
        if (m === null) return; // Prevent unselecting an already selected button

        setSelectedImages([]);
        setMode(m);
    };

    const handleToggleAll = () =>
        setSelectedImages(isAllSelected ? [] : images.map(({ key }) => key));

    const handleCloseCompareDialog = () => {
        setSelectedImages([]);
        closeCompareDialog();
    };

    const createItem = useCallback(
        (f: IPropertyImage, index: number) => {
            const isSelected =
                selectedImages.findIndex((key) => key === f.key) > -1;

            return {
                id: index,
                value: (
                    <SelectableItem
                        selected={isSelected}
                        image={f}
                        onImageClick={handleImageClick}
                    />
                ),
            };
        },
        [selectedImages]
    );

    // TODO: see how controls work for tab !== 'CRM'

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                scroll="body" // (1)
                PaperProps={DialogPaperProps}
            >
                <StyledTitle>
                    <Tabs tab={tab} onChange={setTab} />

                    <Controls
                        mode={mode}
                        onModeChange={handleModeChange}
                        selectedImages={selectedImages}
                        isAllSelected={isAllSelected}
                        // ...
                        onToggleSelectAll={handleToggleAll}
                        onCompare={openCompareDialog}
                        onClose={onClose}
                    />
                </StyledTitle>
                <Divider />
                <StyledContent>
                    <Content tab={tab} createItemCb={createItem} />
                </StyledContent>
            </Dialog>

            {isCompareOpen ? (
                <CompareGallery
                    open={isCompareOpen}
                    image1={selectedImages[0]}
                    image2={selectedImages[1]}
                    onClose={handleCloseCompareDialog}
                />
            ) : null}
        </>
    );
};

export default SeeMore;
