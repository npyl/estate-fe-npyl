import Share from "@/sections/Share";
import useDialog from "@/hooks/useDialog";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton } from "@mui/material";
import { useRef } from "react";

const ShareButton = () => {
    const anchorRef = useRef(null);
    const [isOpen, openDialog, closeDialog] = useDialog();

    const shareUrls = [`${window.location.href}`];

    return (
        <>
            <IconButton ref={anchorRef} onClick={openDialog}>
                <ShareIcon />
            </IconButton>

            {isOpen ? (
                <Share
                    anchorEl={anchorRef.current}
                    shareUrls={shareUrls}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};
export default ShareButton;
