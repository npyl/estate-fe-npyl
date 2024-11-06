import { CSSProperties, ReactNode } from "react";

const getIcons = (style?: CSSProperties): Record<string, ReactNode> => ({
    RESIDENTIAL: (
        <img
            src={"/static/categoryPhotos/home.webp"}
            alt="Home"
            style={{ width: 30, height: 30, ...style }}
        />
    ),
    COMMERCIAL: (
        <img
            src={"/static/categoryPhotos/commercial.webp"}
            alt="Commercial"
            style={{ width: 30, height: 30, ...style }}
        />
    ),
    LAND: (
        <img
            src={"/static/categoryPhotos/land.webp"}
            alt="Land"
            style={{ width: 30, height: 30, ...style }}
        />
    ),
    OTHER: (
        <img
            src={"/static/categoryPhotos/more.webp"}
            alt="More"
            style={{ width: 30, height: 30, ...style }}
        />
    ),
});

export default getIcons;
