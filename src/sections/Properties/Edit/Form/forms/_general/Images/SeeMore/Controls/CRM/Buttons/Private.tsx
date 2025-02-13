import { useTranslation } from "react-i18next";
import { useImageOperations } from "../../../../context/ImageOperations";
import { useRouter } from "next/router";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { ResponsiveSoftButton } from "../../styled";

interface PrivateButtonProps {
    selectedImages: string[];
}

const PrivateButton: React.FC<PrivateButtonProps> = ({ selectedImages }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    const { bulkEditImages, isLoading } = useImageOperations();

    const handleClick = () =>
        bulkEditImages({
            propertyId: +propertyId!,
            body: {
                imageKeys: selectedImages,
                hidden: true,
            },
        });

    return (
        <ResponsiveSoftButton
            disabled={isLoading}
            startIcon={<LockIcon />}
            onClick={handleClick}
        >
            {t("Private")}
        </ResponsiveSoftButton>
    );
};

export default PrivateButton;
