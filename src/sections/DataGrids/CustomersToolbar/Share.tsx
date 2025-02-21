const SharePopover = dynamic(() => import("@/components/Share"));
import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
import ShareIcon from "@mui/icons-material/Share";

const getShareUrl = (customerId: number) =>
    `${window.location.origin}/customer/${customerId}`;

interface ShareProps {
    selectedRows: number[];
}

const ShareButton: FC<ShareProps> = ({ selectedRows }) => {
    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const shareUrls = selectedRows.map(getShareUrl);

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                <ShareIcon />
            </IconButton>

            {isOpen ? (
                <SharePopover
                    anchorEl={anchorRef.current}
                    shareUrls={shareUrls}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default ShareButton;
