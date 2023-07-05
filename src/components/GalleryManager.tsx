import { Dialog, DialogTitle, DialogContent, Grid, Button, Stack, TextField, MenuItem } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SoftButton } from './SoftButton';

import { useState } from 'react';
import CarouselSimple from './CarouselSimple';
import ICarouselImage from './carousel/types';


interface IGalleryManager {
    open: boolean;
    images: File[];
    onDelete: (file: File) => void;
    onClose: () => void;
}

const GalleryManager: React.FC<IGalleryManager> = (props) => {
    const { open, images, onDelete, onClose } = props;

    const _carouselImages: ICarouselImage[] = images.map((image, index) => ({
        id: `${index}`,
        title: "Image",
        image: URL.createObjectURL(image),
        description: "",
        path: "/repository",
    }));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibility, setVisibility] = useState("public");

    const handleImageChange = (newImage: ICarouselImage) => {
        /*
        INFO: the indexes used inside the carousel are not updated in a consistent manner,
                this is why we receive the currentImage on "afterChange", and we get the index that
                translates to our array.
        */
        setCurrentIndex(+newImage.id);
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle>Gallery Manager</DialogTitle>
            <DialogContent >
                <Grid container sx={{ minWidth: 'auto' }}>
                    <Grid item xs={8}>
                        <CarouselSimple onImageChange={handleImageChange} data={_carouselImages} />
                    </Grid>
                    <Grid item xs={4}>

                        <TextField
                            fullWidth
                            label="Title"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                            }}
                            size="small"
                        >

                        </TextField>

                        <TextField
                            fullWidth
                            select
                            label="Visibility"
                            value={visibility}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setVisibility(event.target.value);
                            }}
                            size="small"
                        >
                            <MenuItem value={"public"}>
                                Public
                            </MenuItem>
                            <MenuItem value={"private"}>
                                Private
                            </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent >

            <Stack direction={"row"} justifyContent={"right"} spacing={1} p={1}>
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
        </Dialog >
    );
};

export default GalleryManager;