import React from "react";
import Image, { ImageProps } from "next/image";

const ferimmo = "/static/ferimmo.jpg";

const FerimmoIcon: React.FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image {...props} src={ferimmo} alt="James Edition" />
);

export default FerimmoIcon;
