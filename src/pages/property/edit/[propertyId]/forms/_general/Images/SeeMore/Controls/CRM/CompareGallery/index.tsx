import { DialogTitle, DialogContent, Button } from "@mui/material";
import { useMemo, useState } from "react";
import {
    ComparisonFrame,
    ComparisonImage,
    StyledActions,
    StyledDialog,
} from "./styled";
import usePropertyImages from "../../../../hook";
import { useReorderPropertyImagesWithSetImageVisibilityMutation } from "@/services/properties/file";
import { useTranslation } from "react-i18next";

interface ICompareGallery {
    open: boolean;
    image1: string;
    image2: string;
    onClose: VoidFunction;
}

const CompareGallery: React.FC<ICompareGallery> = ({
    open,
    image1: image1Key,
    image2: image2Key,
    onClose,
}) => {
    const { t } = useTranslation();

    const { images, propertyId } = usePropertyImages();

    const { image1, image2 } = useMemo(
        () => ({
            image1: images.find(({ key }) => key === image1Key),
            image2: images.find(({ key }) => key === image2Key),
        }),
        [images, image1Key, image2Key]
    );

    const [reorderImages] =
        useReorderPropertyImagesWithSetImageVisibilityMutation();

    const [selectedKey, setSelectedKey] = useState("");

    const allKeys = useMemo(() => images.map(({ key }) => key), [images]);

    const handleSetMain = () => {
        const keyIndex = allKeys.indexOf(selectedKey);

        // Move the selected key to the front and reorder the keys array
        const reorderedKeys = [
            selectedKey,
            ...allKeys.slice(0, keyIndex),
            ...allKeys.slice(keyIndex + 1),
        ];

        reorderImages({
            propertyId,
            imageKeys: reorderedKeys,
            imageKey: selectedKey,
            hidden: false,
        }).then(onClose);
    };

    return (
        <StyledDialog open={open} onClose={onClose} closeAfterTransition={true}>
            <DialogTitle>{t("Compare")}</DialogTitle>
            <DialogContent sx={{ padding: 0 }}>
                <ComparisonFrame>
                    <ComparisonImage
                        isSelected={selectedKey === image1?.key}
                        src={image1?.url || ""}
                        alt="image 1"
                        onClick={() => setSelectedKey(image1Key)}
                    />
                    <ComparisonImage
                        isSelected={selectedKey === image2?.key}
                        src={image2?.url || ""}
                        alt="image 1"
                        onClick={() => setSelectedKey(image2Key)}
                    />
                </ComparisonFrame>
            </DialogContent>
            <StyledActions>
                {!!selectedKey ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSetMain}
                    >
                        {t("Set Main")}
                    </Button>
                ) : null}
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    {t("Close")}
                </Button>
            </StyledActions>
        </StyledDialog>
    );
};

export default CompareGallery;
