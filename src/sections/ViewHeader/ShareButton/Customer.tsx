import Share from "@/components/Share";
import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { useRef } from "react";

const CustomerShareButton = () => {
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

export default CustomerShareButton;
