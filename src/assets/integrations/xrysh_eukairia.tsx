import React from "react";
import Image, { ImageProps } from "next/image";

const xe = "/static/xe.jpg";

const XEIcon: React.FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image {...props} src={xe} alt="Golden Opportunity" />
);

export default XEIcon;
