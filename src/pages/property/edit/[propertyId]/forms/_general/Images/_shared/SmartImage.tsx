//
// Responds to different image sizes with different styling
//
// Three types of images (width x height):
//  1. 2048x1365 (Horizontal)
//  2. 1365x2048 (Vertical)
//  3. 2048x1152 (Drone)
//
//  See https://www.notion.so/Images-226c376acb3445dfb7e7b0bed03e1f8e for more info
//

import Box from "@mui/material/Box";
import { Label, LockIcon } from "@/components/image/LabeledImage/styled";
import { ImageProps, ImageRatio } from "@/components/image/types";
import Image from "@/components/image";
import { useLayoutEffect, useRef, useState } from "react";
import { WrapperSx } from "./styled";

const epsilon = 0.01; // floating-point imprecision

const isCloseToRatio = (actual: number, expected: number) =>
    Math.abs(actual - expected) < epsilon;

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

        // Horizontal (2048x1365)
        if (isCloseToRatio(aspectRatio, 2048 / 1365)) {
            return;
        }

        // Vertical (1365x2048)
        if (isCloseToRatio(aspectRatio, 1365 / 2048)) {
            setRatio("1/1");
            imageRef.current.style.objectFit = "contain";
            return;
        }

        // Drone (2048x1152)
        if (isCloseToRatio(aspectRatio, 2048 / 1152)) {
            setRatio("1/1");
            imageRef.current.style.objectFit = "contain";
            return;
        }
    }, []);

    return (
        <Box position="relative">
            <Image
                ref={imageRef}
                src={src}
                ratio={ratio}
                sx={WrapperSx}
                {...props}
            />

            {label ? <Label>{label}</Label> : null}
            {hidden ? <LockIcon fontSize="large" /> : null}
        </Box>
    );
};

export default SmartImage;
