import React from "react";
import Image, { ImageProps } from "next/image";

const rightmove = "/static/rightmove.jpg";

const RightMoveIcon: React.FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image {...props} src={rightmove} alt="James Edition" />
);

export default RightMoveIcon;
