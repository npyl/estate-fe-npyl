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
import Button from "./button";
import CloseIcon from "@mui/icons-material/Close";
import { StyledPaper } from "./styled";
import CopyLinkButton from "./CopyLinkButton";

interface SharePopoverProps extends Omit<PopoverProps, "open" | "onClose"> {
    shareUrl: string;
    onClose: VoidFunction;
}

const SharePopover = ({ shareUrl, onClose, ...props }: SharePopoverProps) => {
    const { t } = useTranslation();

    return (
        <Popover
            open
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

            <CopyLinkButton shareUrl={shareUrl} />
        </Popover>
    );
};

export default SharePopover;
