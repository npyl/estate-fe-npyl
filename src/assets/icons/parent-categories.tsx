import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material";

// Adjust the path as needed

const getIcons = (sx?: SxProps<Theme>): Record<string, ReactNode> => ({
    RESIDENTIAL: (
        <img
            src={"/static/categoryPhotos/home.webp"}
            alt="Home"
            style={{ width: 30, height: 30 }} // Keep it as inline style for regular elements
        />
    ),
    COMMERCIAL: (
        <img
            src={"/static/categoryPhotos/commercial.webp"}
            alt="Commercial"
            style={{ width: 30, height: 30 }}
        />
    ),
    LAND: (
        <img
            src={"/static/categoryPhotos/land.webp"}
            alt="Land"
            style={{ width: 30, height: 30 }}
        />
    ),
    OTHER: (
        <img
            src={"/static/categoryPhotos/more.webp"}
            alt="More"
            style={{ width: 30, height: 30 }}
        />
    ),
});

export default getIcons;
