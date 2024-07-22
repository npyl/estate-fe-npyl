import { Dialog, DialogContent, Divider, PaperProps } from "@mui/material";
import { useCallback } from "react";
import Controls from "./Controls";
import { StyledTitle } from "./styled";
import { TListingTab } from "./types";
import { styled } from "@mui/material/styles";
import Tabs from "./Tabs";
import Content from "./Content";
import React from "react";
import useArrayState from "@/hooks/useArrayState";
import useRefState from "@/hooks/useRefState";
import ListingControls from "./ListingControls";

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
    onOpenGalleryImage: (s: string) => void;
    onClose: () => void;
}

const SeeMore: React.FC<SeeMoreProps> = ({
    open,
    onOpenGalleryImage,
    onClose,
}) => {
    const [tab, setTab, tabRef] = useRefState<TListingTab>("CRM");
    const [mode, setMode, modeRef] = useRefState<"" | "multiple" | "compare">(
        ""
    );

    // keys
    const [selectedImages, setSelectedImages, resetSelectedImages] =
        useArrayState<string[]>([]);

    const handleImageClick = useCallback((imageKey: string) => {
        if (tabRef.current !== "CRM") return;

        // Open in Gallery
        if (modeRef.current === "") {
            onOpenGalleryImage(imageKey);
            onClose();
            return;
        }

        setSelectedImages((old) => {
            const isAlreadySelected = old.includes(imageKey);
            return isAlreadySelected
                ? old.filter((key) => key !== imageKey)
                : modeRef.current === "multiple" ||
                  (modeRef.current === "compare" && old.length < 2)
                ? [...old, imageKey]
                : old;
        });
    }, []);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll="body" // (1)
            PaperProps={DialogPaperProps}
        >
            <StyledTitle>
                <Tabs tab={tab} onChange={setTab} />

                {tab === "CRM" ? (
                    <Controls
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        onResetSelectedImages={resetSelectedImages}
                        mode={mode}
                        setMode={setMode}
                        onClose={onClose}
                    />
                ) : null}

                {tab !== "CRM" ? <ListingControls tab={tab} /> : null}
            </StyledTitle>
            <Divider />
            <StyledContent>
                <Content
                    tab={tab}
                    selectedImages={selectedImages}
                    onImageClick={handleImageClick}
                />
            </StyledContent>
        </Dialog>
    );
};

export default SeeMore;
