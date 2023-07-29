import { Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Box } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { selectVideo, setVideo } from "src/slices/property";
import { useTranslation } from "react-i18next";

const VideoLinkSection: React.FC<any> = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const video = useSelector(selectVideo);

    return (
        <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Video Link")}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Video Link")}
                            value={video}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setVideo(event.target.value));
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default VideoLinkSection;
