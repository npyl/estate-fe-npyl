import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LinkIcon from "./LinkIcon";
import { FC, useCallback } from "react";
import { successToast } from "@/components/Toaster";

import { StyledStack } from "../styled";

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
