import Image, { ImageProps } from "next/image";
import { FC } from "react";

const src = "/static/logo/OriginalGoogleLogo.png";

const OriginalGoogleLogo: FC<Omit<ImageProps, "src" | "alt">> = (props) => (
    <Image width={16} height={16} src={src} alt="GoogleOrgImage" {...props} />
);

export default OriginalGoogleLogo;
