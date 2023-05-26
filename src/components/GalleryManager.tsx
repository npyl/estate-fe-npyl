import { Dialog, DialogTitle, DialogContent, Grid, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SoftButton } from './SoftButton';

import Image from './image/Image';

interface IGalleryManager {
    open: boolean;
    image: string;
    index: number; // index of image in the slice
    onDelete: () => void;
    onClose: () => void;
}

const GalleryManager = (props: IGalleryManager) => {
    const { open, image, index, onDelete, onClose } = props;

    return <>
        <Dialog
            fullWidth
            open={open}
            onClose={() => {
                onClose();
            }}
            closeAfterTransition={true}
        >
            <DialogTitle>
                Gallery Manager
            </DialogTitle>
            <DialogContent>
                <Grid container sx={{ minHeight: 600, minWidth: 'auto' }}>
                    <Grid item xs={8}>
                        <Image src={image} ratio='16/9' />
                    </Grid>
                    <Grid item xs={4}>
                        <SoftButton
                            color="error"
                            onClick={() => {
                                onDelete();
                            }}
                        >
                            <Delete />
                        </SoftButton>

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>

    </>
};

export default GalleryManager;