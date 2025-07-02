import Box from "@mui/material/Box";
import { Label, LockIcon } from "./styled";
import { ImageProps } from "../types";
import Image from "@/components/image";
import { forwardRef } from "react";

export interface LabeledImageProps extends ImageProps {
    label?: string;
    hidden?: boolean;
}

const LabeledImage = forwardRef<HTMLImageElement, LabeledImageProps>(
    ({ src, label, hidden, ...props }, ref) => (
        <Box position="relative">
            <Image ref={ref} src={src} {...props} />
            {label ? <Label>{label}</Label> : null}
            {hidden ? <LockIcon fontSize="large" /> : null}
        </Box>
    )
);

export default LabeledImage;
