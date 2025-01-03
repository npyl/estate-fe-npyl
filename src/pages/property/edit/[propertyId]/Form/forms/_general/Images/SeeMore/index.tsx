import { Dialog, DialogContent, Divider, PaperProps } from "@mui/material";
import { useCallback } from "react";
import Controls from "./Controls";
import { TListingTab } from "./types";
import { styled } from "@mui/material/styles";
import Tabs from "./Tabs";
import Content from "./Content";
import React from "react";
import useArrayState from "@/hooks/useArrayState";
import useRefState from "@/hooks/useRefState";
import ListingControls from "./ListingControls";
import DialogTitle from "./DialogTitle";

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
    onOpenLightbox: (key: string) => void;
    onClose: () => void;
}

const SeeMore: React.FC<SeeMoreProps> = ({ open, onOpenLightbox, onClose }) => {
    const [tab, setTab, tabRef] = useRefState<TListingTab>("CRM");
    const [mode, setMode, modeRef] = useRefState<"" | "multiple" | "compare">(
        ""
    );

    // keys
    const [selectedImages, setSelectedImages, resetSelectedImages] =
        useArrayState<string[]>([]);

    const handleTabChange = useCallback((t: TListingTab) => {
        resetSelectedImages();
        setMode("");
        setTab(t);
    }, []);

    const handleImageClick = useCallback((imageKey: string) => {
        // Open in Gallery
        if (modeRef.current === "") {
            onOpenLightbox(imageKey);
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
            <DialogTitle onClose={onClose}>
                <Tabs tab={tab} onChange={handleTabChange} />

                {tab !== "CRM" ? (
                    <ListingControls integrationSite={tab} />
                ) : null}

                <Controls
                    tab={tab}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    onResetSelectedImages={resetSelectedImages}
                    mode={mode}
                    setMode={setMode}
                />
            </DialogTitle>
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
