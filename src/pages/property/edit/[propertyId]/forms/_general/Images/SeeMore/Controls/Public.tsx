import { useTranslation } from "react-i18next";
import { useImageOperations } from "../../context/ImageOperations";
import { SoftButton } from "@/components/SoftButton";
import { useRouter } from "next/router";
import React from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";

interface PublicButtonProps {
    selectedImages: string[];
}

const PublicButton: React.FC<PublicButtonProps> = ({ selectedImages }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    const { bulkEditImages, isLoading } = useImageOperations();

    const handleClick = () =>
        bulkEditImages({
            propertyId: +propertyId!,
            body: {
                imageKeys: selectedImages,
                hidden: false,
            },
        });

    return (
        <SoftButton
            disabled={isLoading}
            startIcon={<LockOpenIcon />}
            onClick={handleClick}
        >
            {t("Public")}
        </SoftButton>
    );
};

export default PublicButton;
