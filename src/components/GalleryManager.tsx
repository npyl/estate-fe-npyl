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
import { SoftButton } from "./SoftButton";
import { useCallback, useMemo, useState } from "react";
import { useEditPropertyImageMutation } from "src/services/properties";

import CarouselSimple from "./CarouselSimple";
import ICarouselImage from "./carousel/types";
import { IPropertyImage } from "src/types/file";
import { useRouter } from "next/router";
import { LanguageButton } from "./Language/LanguageButton";

interface IGalleryManager {
    open: boolean;
    deleteOnGoing: boolean;
    currentImage?: IPropertyImage;
    images: IPropertyImage[];
    onDelete: (file: IPropertyImage) => void;
    onClose: () => void;
}

const GalleryManager: React.FC<IGalleryManager> = (props) => {
    const { open, deleteOnGoing, currentImage, images, onDelete, onClose } =
        props;

    const router = useRouter();

    const [editImage, { isLoading }] = useEditPropertyImageMutation();

    const { propertyId } = router.query;

    const [currentKey, setCurrentKey] = useState(
        currentImage?.key || images[0].key
    );
    const [showControl, setShowControl] = useState(false);

    // default values
    const initialTitle = useMemo(
        () => images.find((e) => e.key === currentKey)?.title,
        [currentKey, images]
    );
    const initialDescription = useMemo(
        () => images.find((e) => e.key === currentKey)?.description,
        [currentKey, images]
    );
    const initialHidden = useMemo(
        () => images.find((e) => e.key === currentKey)?.hidden,
        [currentKey, images]
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hidden, setHidden] = useState<boolean>();
    const [language, setLanguage] = useState("");

    const _carouselImages: ICarouselImage[] = useMemo(
        () =>
            images.map((image) => ({
                id: image.key,
                title: "Image",
                image: image.url,
                description: "",
                path: "/repository",
            })),
        [images]
    );

    const handleImageChange = (newImage: ICarouselImage) => {
        /*
        INFO: the indexes used inside the carousel are not updated in a consistent manner,
                this is why we receive the currentImage on "afterChange", and we get the index that
                translates to our array.
        */
        handleClear();
        setCurrentKey(newImage.id);
    };

    const handleUpdate = useCallback(() => {
        // const key = images.find((e) => e.id == currentIndex)?.key;

        // update
        editImage({
            id: +propertyId!,
            body: {
                key: currentKey,
                description,
                title,
                hidden,
            },
        });

        setShowControl(false);
    }, [currentKey]);

    const handleClear = () => {
        setTitle("");
        setDescription("");
        setHidden(false);
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
                    <Grid item xs={8} position={"relative"}>
                        <CarouselSimple
                            onImageChange={handleImageChange}
                            mainLabel="main"
                            data={_carouselImages}
                            initialIndex={_carouselImages.findIndex(
                                (e) => currentKey === e.id
                            )}
                        />
                    </Grid>
                    <Grid item xs={4} mt={1}>
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
                                    setHidden(hidden || initialHidden);
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
                                    setHidden(hidden || initialHidden);
                                }}
                            />

                            <TextField
                                fullWidth
                                select
                                label="Visibility"
                                value={
                                    hidden || undefined ? "private" : "public"
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
                        onClick={() => {
                            onDelete(images.find((e) => e.key == currentKey)!);
                        }}
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

export default GalleryManager;
