//
// Three types of images (width x height):
//  1. 2048x1365 (Horizontal)
//  2. 1365x2048 (Vertical)
//  3. 2048x1152 (Drone)
//

import Box from "@mui/material/Box";
import { Label, LockIcon } from "@/components/image/LabeledImage/styled";
import { ImageProps, ImageRatio } from "@/components/image/types";
import Image from "@/components/image";
import { useLayoutEffect, useRef, useState } from "react";

const epsilon = 0.01; // floating-point imprecision

type TSize = {
    width: string;
    height: string;
};

const DEFAULT_SIZE: TSize = {
    width: "100%",
    height: "100%",
};

const isCloseToRatio = (actual: number, expected: number) =>
    Math.abs(actual - expected) < epsilon;

export interface SmartImage extends Omit<ImageProps, "size"> {
    label?: string;
    hidden?: boolean;
}

const SmartImage = ({ src, label, hidden, ref, ...props }: SmartImage) => {
    const [ratio, setRatio] = useState<ImageRatio>("4/3");
    const [size, setSize] = useState<TSize>(DEFAULT_SIZE);

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
            setSize({
                width: "auto",
                height: "100%",
            });
            imageRef.current.style.objectFit = "contain";
            imageRef.current.style.backgroundColor = "#F4F6F8"; // neutral.200
            return;
        }

        // Drone (2048x1152)
        if (isCloseToRatio(aspectRatio, 2048 / 1152)) {
            setRatio("1/1");
            setSize({
                width: "100%",
                height: "auto",
            });
            imageRef.current.style.objectFit = "contain";
            imageRef.current.style.backgroundColor = "#F4F6F8"; // neutral.200
            return;
        }
    }, []);

    return (
        <Box position="relative" width={1} height={1} flexGrow={1}>
            <Image
                ref={imageRef}
                src={src}
                ratio={ratio}
                imgStyle={{
                    width: size.width,
                    height: size.width,
                }}
                {...props}
            />
            {label ? <Label>{label}</Label> : null}
            {hidden ? <LockIcon fontSize="large" /> : null}
        </Box>
    );
};

export default SmartImage;
