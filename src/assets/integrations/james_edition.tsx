import React from "react";
import Image, { ImageProps } from "next/image";

const jamesImage1 = "/static/je_black.png";

const JamesEditionIcon: React.FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image
        {...props}
        src={jamesImage1}
        alt="James Edition"
        width={100}
        height={30}
        style={{ objectFit: "contain" }}
    />
);

export default JamesEditionIcon;
