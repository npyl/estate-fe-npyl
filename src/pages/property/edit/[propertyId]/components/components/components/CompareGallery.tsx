import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    DialogActions,
} from "@mui/material";
import { useState } from "react";

import { IPropertyImage } from "src/types/file";
import ComparisonFrame from "./ComparisonFrame";
import ComparisonImage from "./ComparisonImage";

interface ICompareGallery {
    open: boolean;
    image1: IPropertyImage;
    image2: IPropertyImage;
    onClose: () => void;
    setMain: (str: string) => void;
}

export const CompareGallery: React.FC<ICompareGallery> = (props) => {
    const { open, image1, image2, onClose, setMain } = props;

    const [selectedKey, setSelectedKey] = useState("");
    const handleImageClick = (imageKey: string) => {
        setSelectedKey(imageKey);
    };
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
                    {image1.url && image2.url && (
                        <>
                            <ComparisonImage
                                isSelected={selectedKey === image1.key}
                                src={image1.url}
                                alt="image 1"
                                onClick={() => handleImageClick(image1.key)}
                            />
                            <ComparisonImage
                                isSelected={selectedKey === image2.key}
                                src={image2.url}
                                alt="image 1"
                                onClick={() => handleImageClick(image2.key)}
                            />
                        </>
                    )}
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
