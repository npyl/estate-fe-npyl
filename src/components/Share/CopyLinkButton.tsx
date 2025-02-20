import { Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import LinkIcon from "./LinkIcon";
import { FC, useCallback } from "react";
import { SpaceBetween } from "../styled";
import successToast from "../Toaster/success";

const StyledStack = styled(SpaceBetween)(({ theme }) => ({
    width: "100%",

    padding: theme.spacing(1),
    gap: theme.spacing(1),

    alignItems: "center",

    cursor: "pointer",

    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.neutral?.[700],

    borderRadius: theme.spacing(1),

    "&:hover": {
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.neutral?.[500],
    },
}));

interface CopyLinkButtonProps {
    many: boolean;
    shareUrl: string;
}

const CopyLinkButton: FC<CopyLinkButtonProps> = ({ many, shareUrl }) => {
    const { t } = useTranslation();

    const label = many ? t("COPY_LINK_MANY") : t("Copy Link");

    const handleCopyShareUrl = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            successToast("Copied to clipboard");
        } catch (ex) {
            console.error(ex);
        }
    }, [shareUrl]);

    return (
        <StyledStack onClick={handleCopyShareUrl}>
            <Typography>{label}</Typography>
            <LinkIcon />
        </StyledStack>
    );
};

export default CopyLinkButton;
