import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";
import { SvgIcon } from "@mui/material";

const SharePopover = dynamic(() => import("@/components/Share"));

const ShareButton = () => {
    const { t } = useTranslation();

    const anchorRef = useRef(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    const hasPublic = false;

    return (
        <>
            {!hasPublic ? (
                <Tooltip title={t("Property is not public")}>
                    <IconButton>
                        <SvgIcon>
                            <ShareIcon color="disabled" />
                            <path
                                d="M22 2L2 22"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>
            ) : null}

            {hasPublic ? (
                <IconButton ref={anchorRef} onClick={openPopover}>
                    <Typography mr={1} variant="body2">
                        {t("Share")}
                    </Typography>
                    <ShareIcon fontSize="small" />
                </IconButton>
            ) : null}

            {isOpen ? (
                <SharePopover
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    shareUrl={window.location.href}
                />
            ) : null}
        </>
    );
};

export default ShareButton;
