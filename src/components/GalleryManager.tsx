import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Button,
    Stack,
    TextField,
    MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { SoftButton } from "./SoftButton";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEditPropertyImageMutation } from "src/services/properties";

import CarouselSimple from "./CarouselSimple";
import ICarouselImage from "./carousel/types";
import { IPropertyImage } from "src/types/file";
import { useRouter } from "next/router";
import { LanguagePopover } from "./Language/LanguagePopover";
import { LanguageButton } from "./Language/LanguageButton";

interface IGalleryManager {
    open: boolean;
    images: IPropertyImage[];
    onDelete: (file: IPropertyImage) => void;
    onClose: () => void;
}

const GalleryManager: React.FC<IGalleryManager> = (props) => {
    const { open, images, onDelete, onClose } = props;

    const router = useRouter();
    const dialogTitleRef = useRef(null);
    const [editImage] = useEditPropertyImageMutation();

    const { propertyId } = router.query;

    const [currentIndex, setCurrentIndex] = useState(0);

    // default values
    const [initialTitle, setInitialTitle] = useState(
        images[currentIndex]?.title
    );
    const [initialDescription, setInitialDescription] = useState(
        images[currentIndex]?.description
    );
    const [initialHidden, setInitialHidden] = useState(
        images[currentIndex]?.hidden
    );

    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [hidden, setHidden] = useState(initialHidden);

    const _carouselImages: ICarouselImage[] = useMemo(
        () =>
            images.map((image, index) => ({
                id: `${index}`,
                title: "Image",
                image: image.url,
                description: "",
                path: "/repository",
            })),
        [images]
    );

    const propertyWasChanged = useMemo(
        () =>
            title !== initialTitle ||
            description !== initialDescription ||
            hidden !== initialHidden,
        [
            initialTitle,
            initialDescription,
            initialHidden,
            title,
            description,
            hidden,
        ]
    );

    useEffect(
        () => reload(),
        [
            currentIndex,
            images[currentIndex].title,
            images[currentIndex].description,
            images[currentIndex].hidden,
        ]
    );

    const reload = () => {
        // default values
        setInitialTitle(images[currentIndex].title);
        setInitialDescription(images[currentIndex].description);
        setInitialHidden(images[currentIndex].hidden);

        setTitle(images[currentIndex].title);
        setDescription(images[currentIndex].description);
        setHidden(images[currentIndex].hidden);
    };

    const handleImageChange = (newImage: ICarouselImage) => {
        /*
        INFO: the indexes used inside the carousel are not updated in a consistent manner,
                this is why we receive the currentImage on "afterChange", and we get the index that
                translates to our array.
        */
        setCurrentIndex(+newImage.id);
    };

    const handleUpdate = () => {
        const { key } = images[currentIndex];

        // update
        editImage({
            id: +propertyId!,
            body: {
                key,
                description,
                title,
                hidden,
            },
        });
    };

    const handleClear = () => {
        setTitle(initialTitle);
        setDescription(initialDescription);
        setHidden(initialHidden);
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
            <DialogTitle ref={dialogTitleRef}>
                Gallery Manager
                <LanguageButton
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        mr: 2,
                        mt: 1,
                    }}
                />
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <CarouselSimple
                            onImageChange={handleImageChange}
                            mainLabel="main"
                            data={_carouselImages}
                        />
                    </Grid>
                    <Grid item xs={4} mt={1}>
                        <Grid container gap={1} flex={1}>
                            <TextField
                                fullWidth
                                label="Title"
                                value={title || ""}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />

                            <TextField
                                fullWidth
                                label="Description"
                                value={description || ""}
                                multiline
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />

                            <TextField
                                fullWidth
                                select
                                label="Visibility"
                                value={hidden ? "private" : "public"}
                                onChange={(event) => {
                                    setHidden(
                                        event.target.value === "public"
                                            ? false
                                            : true
                                    );
                                }}
                            >
                                <MenuItem value={"public"}>Public</MenuItem>
                                <MenuItem value={"private"}>Private</MenuItem>
                            </TextField>
                        </Grid>
                        {propertyWasChanged && (
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
                                >
                                    Clear
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogContent
                sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                }}
            >
                <Stack direction={"row"} justifyContent={"right"} spacing={1}>
                    <SoftButton
                        color="error"
                        onClick={() => {
                            onDelete(images[currentIndex]);
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
            </DialogContent>
        </Dialog>
    );
};

export default GalleryManager;
