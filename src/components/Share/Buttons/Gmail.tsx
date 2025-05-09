import { Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { SpaceBetween } from "../../styled";
import GMailIcon from "@/assets/logo/Gmail";
import { useAuth } from "@/hooks/use-auth";

/**
 * Get Gmail-acceptable url
 * @param url is a url (or urls joined by \n) that will be made into email's body
 * @param from the email of the sender; this determines the correct Google Workspace
 */
const getUrl = (url: string, from: string = "0") => {
    const body = encodeURIComponent(url);
    return `https://mail.google.com/mail/u/${from}/?tf=cm&body=${body}`;
};

interface Props {
    shareUrl: string;
}

const GmailButton: FC<Props> = ({ shareUrl }) => {
    const { user } = useAuth();
    const { workspaceEmail } = user || {};

    const handleClick = useCallback(() => {
        if (!workspaceEmail) return;
        const url = getUrl(shareUrl, workspaceEmail);
        window.open(url, "_blank");
    }, [shareUrl, workspaceEmail]);

    return (
        <SpaceBetween
            width={1}
            textAlign="left"
            alignItems="center"
            className="PPShareButton"
            p={0.1}
            borderRadius={1}
            sx={{
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
            <Typography variant="body1" color="text.secondary" width={1}>
                Gmail
            </Typography>
            <GMailIcon
                width={33}
                height={33}
                style={{
                    borderRadius: "100%",
                }}
            />
        </SpaceBetween>
    );
};

export default GmailButton;
