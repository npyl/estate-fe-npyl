import { useTranslation } from "react-i18next";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { ResponsiveSoftButton } from "../../styled";
import { TListingTab } from "../../../types";
import useMakePrivate from "./useMakePrivate";

interface PrivateButtonProps {
    tab: TListingTab;
    selectedImages: string[];
}

const PrivateButton: React.FC<PrivateButtonProps> = ({
    tab,
    selectedImages,
}) => {
    const { t } = useTranslation();

    const { makePrivate, isLoading } = useMakePrivate(tab, selectedImages);

    return (
        <ResponsiveSoftButton
            disabled={isLoading}
            startIcon={<LockIcon />}
            onClick={makePrivate}
        >
            {t("Private")}
        </ResponsiveSoftButton>
    );
};

export default PrivateButton;
