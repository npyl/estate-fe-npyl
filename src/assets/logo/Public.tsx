import NextImage, { ImageProps } from "next/image";
import { FC } from "react";

const src = "/static/PublicLogo.png";

const PublicLogo: FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <NextImage src={src} alt="Public Logo" width={18} height={18} {...props} />
);

export default PublicLogo;
