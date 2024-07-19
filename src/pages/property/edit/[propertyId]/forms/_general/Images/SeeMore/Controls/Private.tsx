import { useTranslation } from "react-i18next";
import { useImageOperations } from "../../context/ImageOperations";
import { SoftButton } from "@/components/SoftButton";
import { useRouter } from "next/router";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";

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
        <SoftButton
            disabled={isLoading}
            startIcon={<LockIcon />}
            onClick={handleClick}
        >
            {t("Public")}
        </SoftButton>
    );
};

export default PrivateButton;
