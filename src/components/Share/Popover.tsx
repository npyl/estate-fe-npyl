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
import { toast } from "react-hot-toast";
import LinkIcon from "./LinkIcon";
import Button from "./button";
import { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { StyledPaper } from "./styled";

interface SharePopoverProps extends Omit<PopoverProps, "onClose"> {
    shareUrl: string;
    onClose: VoidFunction;
}

const SharePopover = ({ shareUrl, onClose, ...props }: SharePopoverProps) => {
    const { t } = useTranslation();

    const handleCopyShareUrl = useCallback(
        () =>
            navigator.clipboard
                .writeText(shareUrl)
                .then(() => toast.success(t("Copied to clipboard")))
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
            slots={{
                paper: StyledPaper,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    alignSelf: "center",
                }}
            >
                {t("Share")}
            </Typography>

            <IconButton
                sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <Divider sx={{ width: 1 }} />

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

                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? "grey.100"
                            : "neutral.700",

                    borderRadius: 1,
                    cursor: "pointer",

                    "&:hover": {
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "grey.200"
                                : "neutral.500",
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
