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
import { useCallback, useMemo, useState } from "react";
import { useEditPropertyImageMutation } from "src/services/properties";

import CarouselSimple from "src/components/CarouselSimple";
import ICarouselImage from "src/components/carousel/types";
import { IPropertyImage } from "src/types/file";
import { useRouter } from "next/router";
import { LanguageButton } from "src/components/Language/LanguageButton";
import { useConditionalMemo } from "src/hooks/useConditionalMemo";

interface IGalleryManager {
    open: boolean;
    deleteOnGoing: boolean;
    currentImage?: IPropertyImage;
    images: IPropertyImage[];
    onChange: (key: string) => void;
    onDelete: (key?: string) => void;
    onClose: () => void;
}

export const GalleryManager: React.FC<IGalleryManager> = (props) => {
    const {
        open,
        deleteOnGoing,
        currentImage,
        images,
        onChange,
        onDelete,
        onClose,
    } = props;

    const router = useRouter();
    const { propertyId } = router.query;

    const [editImage, { isLoading }] = useEditPropertyImageMutation();

    // default values
    const initialTitle = useMemo(
        () => currentImage?.title || null,
        [currentImage]
    );
    const initialDescription = useMemo(
        () => currentImage?.description || null,
        [currentImage]
    );
    const initialHidden = useMemo(
        () => currentImage?.hidden || null,
        [currentImage]
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hidden, setHidden] = useState<boolean>();
    const [language, setLanguage] = useState("");

    const [showControl, setShowControl] = useState(false);

    // Update Carousel Index *ONLY* if we have a seriously valid index
    const carouselIndex = useConditionalMemo(
        () => images.findIndex((e) => e.key === currentImage?.key),
        (newValue) => newValue !== -1,
        [currentImage, images]
    );

    const handleUpdate = useCallback(() => {
        // update
        editImage({
            id: +propertyId!,
            body: {
                key: currentImage?.key,
                description,
                title,
                hidden,
            },
        });

        setShowControl(false);
    }, [currentImage?.key, description, title, hidden]);

    const handleImageChange = (i: ICarouselImage) => {
        handleClear();
        onChange(i.key!);
    };

    const handleClear = () => {
        setTitle("");
        setDescription("");
        setHidden(undefined);
        setShowControl(false);
    };

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
                Gallery Manager
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
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={10} position={"relative"}>
                        <CarouselSimple
                            onImageChange={handleImageChange}
                            mainLabel="main"
                            data={images as ICarouselImage[]}
                            initialIndex={carouselIndex}
                        />
                    </Grid>
                    <Grid item xs={2} mt={1}>
                        <Grid container gap={1} flex={1}>
                            <TextField
                                fullWidth
                                label="Title"
                                value={title || initialTitle || ""}
                                onChange={(event) => {
                                    !showControl && setShowControl(true);
                                    setTitle(event.target.value);
                                    setDescription(
                                        description || initialDescription || ""
                                    );
                                    setHidden(hidden || initialHidden || false);
                                }}
                            />

                            <TextField
                                sx={{
                                    "& .MuiInputBase-root": {
                                        height: "auto!important",
                                    },
                                    "& .MuiInputBase-input.MuiOutlinedInput-input":
                                        {
                                            padding: 1,
                                        },
                                }}
                                fullWidth
                                label="Description"
                                value={description || initialDescription || ""}
                                multiline
                                rows={5}
                                onChange={(event) => {
                                    !showControl && setShowControl(true);
                                    setTitle(title || initialTitle || "");
                                    setDescription(event.target.value);
                                    setHidden(hidden || initialHidden || false);
                                }}
                            />

                            <TextField
                                fullWidth
                                select
                                label="Visibility"
                                value={
                                    (
                                        hidden !== undefined
                                            ? hidden
                                            : initialHidden
                                    )
                                        ? "private"
                                        : "public"
                                }
                                onChange={(event) => {
                                    setTitle(title || initialTitle || "");
                                    setDescription(
                                        description || initialDescription || ""
                                    );
                                    setHidden(
                                        event.target.value === "public"
                                            ? false
                                            : true
                                    );
                                    !showControl && setShowControl(true);
                                }}
                            >
                                <MenuItem value={"public"}>Public</MenuItem>
                                <MenuItem value={"private"}>Private</MenuItem>
                            </TextField>
                        </Grid>
                        {showControl && (
                            <Stack
                                direction={"row"}
                                justifyContent={"right"}
                                spacing={1}
                                mt={2}
                            >
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleClear}
                                    disabled={isLoading}
                                >
                                    Clear
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleUpdate}
                                    disabled={isLoading}
                                >
                                    Update
                                </Button>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions
                sx={{
                    float: "right",
                }}
            >
                <Stack direction={"row"} justifyContent={"right"} spacing={1}>
                    <SoftButton
                        color="error"
                        disabled={deleteOnGoing}
                        onClick={() => onDelete(currentImage?.key)}
                    >
                        <Delete />
                    </SoftButton>
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
