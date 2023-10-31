import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Button,
    Stack,
    TextField,
    MenuItem,
    DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { SoftButton } from "src/components/SoftButton";
import { useCallback, useMemo, useRef, useState } from "react";
import { useEditPropertyImageMutation } from "src/services/properties";

import CarouselSimple from "src/components/CarouselSimple";
import ICarouselImage from "src/components/carousel/types";
import { IPropertyImage } from "src/types/file";
import { useRouter } from "next/router";
import { LanguageButton } from "src/components/Language/LanguageButton";
import ComparisonFrame from "./ComparisonFrame";
import ComparisonImage from "./ComparisonImage";

const useConditionalMemo = (
    callback: () => number,
    condition: (value: number) => boolean, // condition to accept new value
    dependencies: any[]
) => {
    const value = useRef(0);
    const newValue = useMemo(callback, dependencies);

    // Update ONLY if condition is true
    if (condition(newValue)) value.current = newValue;

    return value.current;
};

interface ICompareGallery {
    open: boolean;
    image1: IPropertyImage;
    image2: IPropertyImage;
    onClose: () => void;
}

export const CompareGallery: React.FC<ICompareGallery> = (props) => {
    const {
        open,
        image1,
        image2,
        onClose
        
    } = props;

    const router = useRouter();
    const { propertyId } = router.query;

    const [title, setTitle] = useState("");
    
    const [language, setLanguage] = useState("");
    
    
    

    

    return (
        <Dialog
            fullWidth
            open={open}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        minWidth: "80vw",
                    },
                },
            }}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle>
                Comparison Window
                <LanguageButton
                    updatesGlobalLanguage={false}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        mr: 2,
                        mt: 1,
                    }}
                    onLanguageChange={(language) =>
                        setLanguage(language as string)
                    }
                />
            </DialogTitle>
            <DialogContent sx={{padding:"0"}}>
                <ComparisonFrame >
                {(image1.url && image2.url) && (
                    <>
                        <ComparisonImage src={image1.url} alt="image 1" /> 
                        <ComparisonImage src={image2.url} alt="image 1" />
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
