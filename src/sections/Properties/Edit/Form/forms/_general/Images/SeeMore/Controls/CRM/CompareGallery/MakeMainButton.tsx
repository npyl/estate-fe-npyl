import { FC, useMemo } from "react";
import usePropertyImages from "../../../../hook";
import { useReorderPropertyImagesWithSetImageVisibilityMutation } from "@/services/properties/file";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";

interface MakeMainButtonProps {
    selectedKey: string;
    onClose?: VoidFunction;
}

const MakeMainButton: FC<MakeMainButtonProps> = ({ selectedKey, onClose }) => {
    const { t } = useTranslation();

    const { images, propertyId } = usePropertyImages();

    const allKeys = useMemo(() => images.map(({ key }) => key), [images]);

    const [reorderImages, { isLoading }] =
        useReorderPropertyImagesWithSetImageVisibilityMutation();

    const handleSetMain = async () => {
        const keyIndex = allKeys.indexOf(selectedKey);

        // Move the selected key to the front and reorder the keys array
        const reorderedKeys = [
            selectedKey,
            ...allKeys.slice(0, keyIndex),
            ...allKeys.slice(keyIndex + 1),
        ];

        const res = await reorderImages({
            propertyId,
            imageKeys: reorderedKeys,
            imageKey: selectedKey,
            hidden: false,
        });

        if ("error" in res) return;

        onClose?.();
    };

    return (
        <LoadingButton
            variant="contained"
            color="primary"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSetMain}
        >
            {t("Set Main")}
        </LoadingButton>
    );
};

export default MakeMainButton;
