import { Stack, Paper, Typography, Box } from "@mui/material";
import React from "react";

import { IProperties } from "src/types/properties";

interface VideoSectionProps {
  data: IProperties;
}

const VideoSection: React.FC<VideoSectionProps> = (props) => {
  const { data } = props;
  const video = data?.video;

  if (!video || !video.url) return null;

  return (
    <Stack spacing={2} direction={{ md: "row", xs: "column" }} p={2}>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          width: { md: "50vw", sm: "100vw" },
          height: { md: "50vh", sm: "100vh" },
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={video.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
    </Stack>
  );
};

export default VideoSection;
