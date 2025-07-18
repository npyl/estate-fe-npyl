import { SxProps, Theme, Typography } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { SpaceBetween } from "@/components/styled";
import GMailIcon from "@/assets/logo/Gmail";
import { useAuth } from "@/hooks/use-auth";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import { AVATAR_CLASSNAME } from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import { useIsAuthenticatedQuery } from "@/services/google-oauth";
const CurrentMessageBox = dynamic(() => import("./CurrentMessageBox"));

// INFO: ssr problem so lets wrap into a memo
const useIndicatorSx = () =>
    useMemo<SxProps<Theme>>(
        () => ({
            [`&.${AVATAR_CLASSNAME}`]: {
                display: "none",
            },
        }),
        []
    );

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

    const body = getUrl(shareUrl, workspaceEmail);

    const { data } = useIsAuthenticatedQuery(user?.id!);
    const disabled = !data?.isAuthenticated;

    const [isOpen, openMessageBox, closeMessageBox] = useDialog();
    const onClick = useCallback(() => {
        if (disabled) return;
        openMessageBox();
    }, [openMessageBox, disabled]);

    const IndicatorSx = useIndicatorSx();

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

                <IsAuthenticatedIndicator sx={IndicatorSx}>
                    <GMailIcon
                        width={33}
                        height={33}
                        style={{
                            borderRadius: "100%",
                        }}
                    />
                </IsAuthenticatedIndicator>
            </SpaceBetween>

            {isOpen ? (
                <CurrentMessageBox body={body} onClose={closeMessageBox} />
            ) : null}
        </>
    );
};

export default GmailButton;
