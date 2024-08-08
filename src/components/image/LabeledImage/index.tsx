//
// Three types of images (width x height):
//  1. 2048x1365
//  2. 1365x2048
//  3. 2048x1152
//

// TODO: will be named PropertyImage

import Box from "@mui/material/Box";
import Image from "src/components/image/Image";
import { Label, LockIcon } from "./styled";
import { ImageProps } from "../types";

export interface LabeledImageProps extends ImageProps {
    label?: string;
    hidden?: boolean;
}

const LabeledImage = ({
    src,
    label,
    hidden,
    ref,
    ...props
}: LabeledImageProps) => (
    <Box position="relative">
        <Image src={src} {...props} />

        {label ? <Label>{label}</Label> : null}
        {hidden ? <LockIcon fontSize="large" /> : null}
    </Box>
);

export default LabeledImage;
