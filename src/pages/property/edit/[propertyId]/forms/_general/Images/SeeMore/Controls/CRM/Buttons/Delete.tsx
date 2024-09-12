import { useTranslation } from "react-i18next";
import { useImageOperations } from "../../../../context/ImageOperations";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { ResponsiveSoftButton } from "../../styled";

interface DeleteButtonProps {
    selectedImages: string[];
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ selectedImages }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    const { bulkDeleteImages, isLoading } = useImageOperations();

    const handleClick = () =>
        bulkDeleteImages({
            propertyId: +propertyId!,
            imageKeys: selectedImages,
        });

    return (
        <ResponsiveSoftButton
            disabled={isLoading}
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClick}
        >
            {t("Delete")}
        </ResponsiveSoftButton>
    );
};

export default DeleteButton;
