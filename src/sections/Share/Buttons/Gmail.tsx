import { Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { SpaceBetween } from "@/components/styled";
import GMailIcon from "@/assets/logo/Gmail";
import { useAuth } from "@/hooks/use-auth";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const MessageBox = dynamic(() => import("@/sections/Emails/Send/MessageBox"));

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
    onHideParent: VoidFunction;
}

const GmailButton: FC<Props> = ({ shareUrl, onHideParent }) => {
    const { user } = useAuth();
    const { workspaceEmail } = user || {};

    const body = getUrl(shareUrl, workspaceEmail);
    console.log("BODY: ", body);

    const [isOpen, openMessageBox, closeMessageBox] = useDialog();
    const onClick = useCallback(() => {
        onHideParent();
        openMessageBox();
    }, []);

    return (
        <>
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
                onClick={onClick}
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

            {isOpen ? (
                <MessageBox body={body} onClose={closeMessageBox} />
            ) : null}
        </>
    );
};

export default GmailButton;
