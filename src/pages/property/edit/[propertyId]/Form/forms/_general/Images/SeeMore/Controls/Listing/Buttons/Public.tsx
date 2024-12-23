import { useTranslation } from "react-i18next";
import React from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { ResponsiveSoftButton } from "../../styled";
import { TListingTab } from "../../../types";
import useMakePublic from "./useMakePublic";

interface PublicButtonProps {
    tab: TListingTab;
    selectedImages: string[];
}

const PublicButton: React.FC<PublicButtonProps> = ({ tab, selectedImages }) => {
    const { t } = useTranslation();

    const { makePublic, isLoading } = useMakePublic(tab, selectedImages);

    return (
        <ResponsiveSoftButton
            disabled={isLoading}
            startIcon={<LockOpenIcon />}
            onClick={makePublic}
        >
            {t("Public")}
        </ResponsiveSoftButton>
    );
};

export default PublicButton;
