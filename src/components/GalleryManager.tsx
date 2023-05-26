import { Dialog, DialogTitle, DialogContent, Grid, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SoftButton } from './SoftButton';

interface IGalleryManager {
    open: boolean;
    onDelete: () => void;
    onClose: () => void;
}

const GalleryManager = (props: IGalleryManager) => {
    const { open, onDelete, onClose } = props;

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
                <Grid container sx={{ height: 600 }}>
                    <Grid item xs={8}>hello</Grid>
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