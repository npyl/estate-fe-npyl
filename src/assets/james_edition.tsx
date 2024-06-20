import React from "react";
import Image, { ImageProps } from "next/image";

const jamesImage = "/static/james_edition.png";
const jamesImage1 = "/static/james_edition1.png";

const JamesEditionIcon: React.FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image
        {...props}
        src={jamesImage1}
        alt="James Edition"
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
    />
);

export default JamesEditionIcon;
