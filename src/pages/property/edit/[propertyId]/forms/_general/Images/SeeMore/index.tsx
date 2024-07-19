import { Dialog, DialogContent, Divider, PaperProps } from "@mui/material";
import { useState } from "react";
import Controls from "./Controls";
import { StyledTitle } from "./styled";
import { TListingTab } from "./types";
import { styled } from "@mui/material/styles";
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
    const [tab, setTab] = useState<TListingTab>("CRM");

    const [mode, setMode] = useState<"" | "multiple" | "compare">("");
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // keys

    const handleImageClick = (imageKey: string) => {
        if (tab !== "CRM") return;

        setSelectedImages((old) => {
            const isAlreadySelected = old.includes(imageKey);

            return isAlreadySelected
                ? old.filter((key) => key !== imageKey) // remove
                : mode === "multiple" || (mode === "compare" && old.length < 2) // add
                ? [...old, imageKey]
                : old;
        });
    };

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
                        mode={mode}
                        setMode={setMode}
                        onClose={onClose}
                    />
                ) : null}
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
