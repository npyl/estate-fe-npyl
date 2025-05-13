import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import { FC, useCallback } from "react";
import { SpaceBetween } from "@/components/styled";

interface Props {
    shareUrl: string;
}

const EmailButton: FC<Props> = ({ shareUrl }) => {
    const handleClick = useCallback(() => {
        const encodedBody = encodeURIComponent(shareUrl);
        const mailtoLink = `mailto:?subject=&body=${encodedBody}`;
        window.location.href = mailtoLink;
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
                Email
            </Typography>

            <EmailIcon
                sx={{
                    fontSize: "30px",
                    borderRadius: "100%",
                }}
            />
        </SpaceBetween>
    );
};

export default EmailButton;
