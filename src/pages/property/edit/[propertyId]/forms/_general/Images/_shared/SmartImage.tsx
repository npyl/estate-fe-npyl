//
// Three types of images (width x height):
//  1. 2048x1365 (Horizontal)
//  2. 1365x2048 (Vertical)
//  3. 2048x1152 (Drone)
//
//  This image component responds to these categories like so:
//      1. and 3. are given aspect-ratio 1/1 and objectFit: contain with a mildly gray background
//      2. or other, are given 4/3 (and width: '100%', height: "100%" from Image component default)
//

import Box from "@mui/material/Box";
import { Label, LockIcon } from "@/components/image/LabeledImage/styled";
import { ImageProps, ImageRatio } from "@/components/image/types";
import Image from "@/components/image";
import { useLayoutEffect, useRef, useState } from "react";

export interface SmartImage extends Omit<ImageProps, "size"> {
    label?: string;
    hidden?: boolean;
}

const SmartImage = ({ src, label, hidden, ref, ...props }: SmartImage) => {
    const [ratio, setRatio] = useState<ImageRatio>("4/3");

    const imageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        if (!imageRef.current || !imageRef.current.style) return;

        const aspectRatio =
            imageRef.current.naturalWidth / imageRef.current.naturalHeight;

        const epsilon = 0.01; // floating-point imprecision

        // Horizontal
        if (Math.abs(aspectRatio - 2048 / 1365) < epsilon) {
            setRatio("1/1");
            imageRef.current.style.objectFit = "contain";
            imageRef.current.style.backgroundColor = "#F4F6F8"; // neutral.200
        }
        // vertical
        else if (Math.abs(aspectRatio - 1365 / 2048) < epsilon) {
        }
        // drone
        else if (Math.abs(aspectRatio - 2048 / 1152) < epsilon) {
            setRatio("1/1");
            imageRef.current.style.objectFit = "contain";
            imageRef.current.style.backgroundColor = "#F4F6F8"; // neutral.200
        } else {
            // OTHER
        }
    }, []);

    return (
        <Box position="relative" width={1} height={1} flexGrow={1}>
            <Image ref={imageRef} ratio={ratio} src={src} {...props} />

            {label ? <Label>{label}</Label> : null}
            {hidden ? <LockIcon fontSize="large" /> : null}
        </Box>
    );
};

export default SmartImage;
