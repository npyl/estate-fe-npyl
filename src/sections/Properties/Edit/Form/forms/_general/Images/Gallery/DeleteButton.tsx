import { Delete } from "@mui/icons-material";
import SoftButton from "@/components/SoftButton";
import { FC } from "react";
import { useDeletePropertyImageMutation } from "@/services/properties";
import usePropertyImages from "../hook";

interface DeleteButtonProps {
    currentImageKey: string;
    setCurrentImageKey: (s: string) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({
    currentImageKey,
    setCurrentImageKey,
}) => {
    const { images, propertyId } = usePropertyImages();

    const [deleteImage, { isLoading }] = useDeletePropertyImageMutation();

    const onClick = async () => {
        if (!currentImageKey) return;

        // Prepare Next Image to avoid jumping
        const index = images.findIndex((f) => f.key === currentImageKey);
        if (index < 0) return;

        // Normalize if we are hitting last index
        const nextIndex =
            index === images.length - 1 ? images.length - 2 : index + 1;
        const nextImageKey = images.at(nextIndex)?.key || "";

        if (!nextImageKey) return;

        const res = await deleteImage({
            propertyId,
            imageKey: currentImageKey,
        });
        if ("error" in res) return;

        setCurrentImageKey(nextImageKey);
    };

    return (
        <SoftButton
            color="error"
            disabled={isLoading}
            loading={isLoading}
            onClick={onClick}
        >
            <Delete />
        </SoftButton>
    );
};

export default DeleteButton;
