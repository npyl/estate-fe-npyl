import { Dialog, DialogTitle, DialogContent, Grid, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SoftButton } from './SoftButton';

import { fileData } from "src/components/file-thumbnail";
import Image from './image/Image';

interface IGalleryManager {
    open: boolean;
    fileInput: File;
    onDelete: (file: File) => void;
    onClose: () => void;
}

const GalleryManager: React.FC<IGalleryManager> = (props) => {
    const { open, fileInput, onDelete, onClose } = props;

    const data = fileData(fileInput);
    const image = data?.preview;

    if (!image) return null; // Return null instead of undefined

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle>Gallery Manager</DialogTitle>
            <DialogContent>
                <Grid container sx={{ minHeight: 600, minWidth: 'auto' }}>
                    <Grid item xs={8}>
                        <Image src={image} ratio="16/9" />
                    </Grid>
                    <Grid item xs={4}>
                        <SoftButton
                            color="error"
                            onClick={() => {
                                onDelete(fileInput);
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
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default GalleryManager;