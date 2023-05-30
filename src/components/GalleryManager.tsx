import { Dialog, DialogTitle, DialogContent, Grid, Button, Stack, TextField, MenuItem } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SoftButton } from './SoftButton';

import { fileData } from "src/components/file-thumbnail";
import Image from './image/Image';

import { useState } from 'react';

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

    const [visibility, setVisibility] = useState("public");

    if (!image) return null; // Return null instead of undefined

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
                        <Image src={image} ratio="16/9" />
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
            </Stack>
        </Dialog >
    );
};

export default GalleryManager;