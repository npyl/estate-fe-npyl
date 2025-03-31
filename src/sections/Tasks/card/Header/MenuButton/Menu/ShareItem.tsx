import useDialog from "@/hooks/useDialog";
import { SxProps, Theme } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
const Share = dynamic(() => import("@/components/Share"));

const ShareSx: SxProps<Theme> = {
    ".PPShare-OtherSection, .PPShare-OtherSectionDivider": {
        display: "none",
    },
};

interface ShareItemProps {
    taskId: number;
}

const ShareItem: FC<ShareItemProps> = ({ taskId }) => {
    const { t } = useTranslation();

    const anchorRef = useRef(null);
    const [isOpen, openDialog, closeDialog] = useDialog();

    const shareUrls = [`${window.location.href}/${taskId}`];

    return (
        <>
            <MenuItem ref={anchorRef} onClick={openDialog}>
                {t("Share")}
            </MenuItem>

            {isOpen ? (
                <Share
                    anchorEl={anchorRef.current}
                    shareUrls={shareUrls}
                    onClose={closeDialog}
                    sx={ShareSx}
                />
            ) : null}
        </>
    );
};

export default ShareItem;
