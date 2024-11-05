import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface CopyLinkItemProps {
    taskId: number;
}

const CopyLinkItem: FC<CopyLinkItemProps> = ({ taskId }) => {
    const { t } = useTranslation();

    const handleClick = useCallback(async () => {
        try {
            const url = new URL(window.location.href);
            url.searchParams.set("taskId", taskId.toString());

            await navigator.clipboard.writeText(url.toString());

            toast.success(t("Copied to clipboard"));
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    }, []);

    return <MenuItem onClick={handleClick}>{t("Copy Link")}</MenuItem>;
};

export default CopyLinkItem;
