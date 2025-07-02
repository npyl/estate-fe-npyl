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

import { ImageProps } from "@/components/image/types";
import BaseImage from "./BaseImage";
import { forwardRef, SyntheticEvent, useCallback } from "react";

const epsilon = 0.01; // floating-point imprecision

const isCloseToRatio = (actual: number, expected: number) =>
    Math.abs(actual - expected) < epsilon;

interface SmartImageProps extends Omit<ImageProps, "size"> {}

const SmartImage = forwardRef<HTMLImageElement, SmartImageProps>(
    ({ src, ...props }, ref) => {
        const onLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
            const el = e.currentTarget;
            if (!el || !el.style) return;

            const aspectRatio = el.naturalWidth / el.naturalHeight;

            // Horizontal (2048x1365)
            if (isCloseToRatio(aspectRatio, 2048 / 1365)) {
                return;
            }

            // Vertical (1365x2048)
            if (isCloseToRatio(aspectRatio, 1365 / 2048)) {
                el.style.objectFit = "contain";
                return;
            }

            // Drone (2048x1152)
            if (isCloseToRatio(aspectRatio, 2048 / 1152)) {
                el.style.objectFit = "contain";
                return;
            }
        }, []);

        return (
            <BaseImage
                ref={ref}
                onLoad={onLoad}
                src={src}
                ratio="4/3"
                {...props}
            />
        );
    }
);

export type { SmartImageProps };
export default SmartImage;
