import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";
import dynamic from "next/dynamic";
const PropertyShare = dynamic(() => import("./Popover"));

const EnabledShareButton = () => {
    const { t } = useTranslation();

    const anchorRef = useRef(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <Tooltip title={t("Share")}>
                <IconButton ref={anchorRef} onClick={openPopover}>
                    <ShareIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            {isOpen ? (
                <PropertyShare
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default EnabledShareButton;
