import React from "react";
import Image, { ImageProps } from "next/image";

const jamesImage = "/static/james_edition.jpg";

const JamesEditionIcon: React.FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image {...props} src={jamesImage} alt="James Edition" />
);

export default JamesEditionIcon;
