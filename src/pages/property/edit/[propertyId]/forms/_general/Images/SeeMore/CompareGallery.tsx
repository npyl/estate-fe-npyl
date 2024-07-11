import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    DialogActions,
} from "@mui/material";
import { useMemo, useState } from "react";

import { ComparisonFrame, ComparisonImage } from "./styled";
import usePropertyImages from "../hook";

interface ICompareGallery {
    open: boolean;
    image1: string;
    image2: string;
    onClose: VoidFunction;
    setMain: (str: string) => void;
}

export const CompareGallery: React.FC<ICompareGallery> = (props) => {
    const {
        open,
        image1: image1Key,
        image2: image2Key,
        onClose,
        setMain,
    } = props;

    const { images } = usePropertyImages();

    const { image1, image2 } = useMemo(
        () => ({
            image1: images.find(({ key }) => key === image1Key),
            image2: images.find(({ key }) => key === image2Key),
        }),
        [images, image1Key, image2Key]
    );

    const [selectedKey, setSelectedKey] = useState("");

    const handleSetMain = () => {
        if (selectedKey) {
            setMain(selectedKey);
        } else {
            alert("Please Select an Image to set as Main Thumbnail");
        }
    };

    return (
        <Dialog
            fullWidth
            open={open}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        minWidth: "90vw",
                    },
                },
            }}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle>Comparison Window</DialogTitle>
            <DialogContent sx={{ padding: "0" }}>
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
            <DialogActions
                sx={{
                    float: "right",
                }}
            >
                <Stack direction={"row"} justifyContent={"right"} spacing={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSetMain}
                    >
                        Set Main
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};
