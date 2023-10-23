import { Box, Paper } from "@mui/material";
import React from "react";

import { IProperties } from "src/types/properties";

interface VideoSectionProps {
    data: IProperties;
}

const getVideoId = (url: string) => {
    if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1];
    } else if (url.includes("youtube.com/embed/")) {
        return url.split("youtube.com/embed/")[1];
    } else if (url.includes("watch?v=")) {
        let videoId = url.split("watch?v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
    }
    return null;
};

const VideoSection: React.FC<VideoSectionProps> = (props) => {
    const { data } = props;

    if (!data || !data.video) return null;

    const videoId = getVideoId(data.video.trim());

    if (!videoId) return null;

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    width: {},
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </Box>
        </Paper>
    );
};

export default VideoSection;
