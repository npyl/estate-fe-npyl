import { Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { SpaceBetween } from "../../styled";
import GMailIcon from "@/assets/logo/Gmail";

const getUrl = (url: string) =>
    `https://mail.google.com/mail/?view=cm&body=${encodeURIComponent(url)}`;

interface Props {
    shareUrl: string;
}

const GmailButton: FC<Props> = ({ shareUrl }) => {
    const handleClick = useCallback(() => {
        const url = getUrl(shareUrl);
        window.open(url, "_blank");
    }, [shareUrl]);

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
