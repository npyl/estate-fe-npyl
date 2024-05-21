import React from "react";
import Image, { ImageProps } from "next/image";

const plotImage = "/static/plotgr.jpg";

const PlotGRIcon: React.FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image {...props} src={plotImage} alt="Plot.gr" />
);

export default PlotGRIcon;
