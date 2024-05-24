import {
    WhatsappShareButton,
    WhatsappIcon,
    ViberShareButton,
    ViberIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
} from "react-share";
import {
    Popover,
    PopoverProps,
    IconButton,
    Box,
    Typography,
    Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import LinkIcon from "./LinkIcon";
import Button from "./button";
import { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface SharePopoverProps extends Omit<PopoverProps, "onClose"> {
    shareUrl: string;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

const SharePopover = ({ shareUrl, onClose, ...props }: SharePopoverProps) => {
    const { t } = useTranslation();

    const handleCopyShareUrl = useCallback(
        () =>
            navigator.clipboard
                .writeText(shareUrl)
                .then(() => toast.info(t("Copied to clipboard")))
                .catch(() => {}),
        [shareUrl, t]
    );

    return (
        <Popover
            {...props}
            anchorOrigin={{
                vertical: "center",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "center",
            }}
            keepMounted
            PaperProps={{
                sx: {
                    p: 2,
                    width: "280px",
                    maxWidth: "90vw",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    alignItems: "flex-start",
                    position: "relative",
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "background.paper",
                },
            }}
        >
            <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={(event) => onClose(event, "backdropClick")}
            >
                <CloseIcon />
            </IconButton>

            <Typography variant="h6" sx={{ mb: 1, alignSelf: "center" }}>
                {t("Share")}
            </Typography>

            <Divider sx={{ width: "100%" }} />

            <Typography variant="subtitle2" sx={{ ml: 1, mt: 1, mb: 0.5 }}>
                {t("Chat")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    mb: 1,
                    width: "100%",
                }}
            >
                <Button
                    Component={WhatsappShareButton}
                    label="WhatsApp"
                    icon={WhatsappIcon}
                    shareUrl={shareUrl}
                />
                <Button
                    Component={ViberShareButton}
                    label="Viber"
                    icon={ViberIcon}
                    shareUrl={shareUrl}
                />
            </Box>

            <Divider sx={{ width: "100%" }} />

            <Typography variant="subtitle2" sx={{ ml: 1, mt: 1, mb: 0.5 }}>
                {t("Email")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    mb: 1,
                    width: "100%",
                }}
            >
                <Button
                    Component={EmailShareButton}
                    label="Email"
                    icon={EmailIcon}
                    shareUrl={shareUrl}
                />
            </Box>

            <Divider sx={{ width: "100%" }} />

            <Typography variant="subtitle2" sx={{ ml: 1, mt: 1, mb: 0.5 }}>
                {t("Social Networks")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    mb: 1,
                    width: "100%",
                }}
            >
                <Button
                    Component={FacebookShareButton}
                    label="Facebook"
                    icon={FacebookIcon}
                    shareUrl={shareUrl}
                />
                <Button
                    Component={TwitterShareButton}
                    label="Twitter"
                    icon={TwitterIcon}
                    shareUrl={shareUrl}
                />
                <Button
                    Component={LinkedinShareButton}
                    label="LinkedIn"
                    icon={LinkedinIcon}
                    shareUrl={shareUrl}
                />
            </Box>

            <Divider sx={{ width: "100%" }} />

            <Typography variant="subtitle2" sx={{ ml: 1, mt: 1, mb: 0.5 }}>
                {t("Other")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    backgroundColor: "grey.100",
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: "grey.200",
                    },
                    width: "100%",
                    justifyContent: "space-between",
                }}
                onClick={handleCopyShareUrl}
            >
                <Typography>{t(`Copy Link`)}</Typography>
                <LinkIcon />
            </Box>
        </Popover>
    );
};

export default SharePopover;
