import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { useMemo, useState } from "react";

import { ComparisonFrame, ComparisonImage } from "./styled";
import usePropertyImages from "../hook";

import { styled } from "@mui/material/styles";
import { useReorderPropertyImagesMutation } from "@/services/properties/file";
import { useRouter } from "next/router";

const StyledDialog = styled(Dialog)({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            minWidth: "90vw",
        },
    },
});
const StyledActions = styled(DialogActions)(({ theme }) => ({
    float: "right",
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
    justifyContent: "right",
}));

interface ICompareGallery {
    open: boolean;
    image1: string;
    image2: string;
    onClose: VoidFunction;
}

export const CompareGallery: React.FC<ICompareGallery> = ({
    open,
    image1: image1Key,
    image2: image2Key,
    onClose,
}) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { images } = usePropertyImages();

    const { image1, image2 } = useMemo(
        () => ({
            image1: images.find(({ key }) => key === image1Key),
            image2: images.find(({ key }) => key === image2Key),
        }),
        [images, image1Key, image2Key]
    );

    const [reorderImages] = useReorderPropertyImagesMutation();

    const [selectedKey, setSelectedKey] = useState("");

    const allKeys = useMemo(() => images.map((file) => file.key), [images]);

    const handleSetMain = () => {
        if (selectedKey) {
            const keyIndex = allKeys.indexOf(selectedKey);

            // Move the selected key to the front and reorder the keys array
            const reorderedKeys = [
                selectedKey,
                ...allKeys.slice(0, keyIndex),
                ...allKeys.slice(keyIndex + 1),
            ];

            reorderImages({
                id: +propertyId!,
                body: reorderedKeys,
            });
        } else {
            alert("Please Select an Image to set as Main Thumbnail");
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose} closeAfterTransition={true}>
            <DialogTitle>Comparison Window</DialogTitle>
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSetMain}
                >
                    Set Main
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Close
                </Button>
            </StyledActions>
        </StyledDialog>
    );
};
