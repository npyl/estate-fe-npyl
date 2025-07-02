import { ImageProps } from "@/components/image/types";
import { forwardRef, useCallback, useRef, SyntheticEvent } from "react";
import NoImageIcon from "@/assets/icons/no-image";
import { styled, Theme } from "@mui/material";

const StyledImg = styled("img")(({ theme }) => ({
    backgroundColor: getBgColor(theme),
    borderRadius: theme.spacing(1),
}));

const getBgColor = ({ palette: { mode, neutral } }: Theme) =>
    mode === "light" ? neutral?.[200] : neutral?.[800];

const BaseImage = forwardRef<HTMLImageElement, ImageProps>(
    ({ alt = "", src = "", style, aspectRatio, onLoad, ...props }, ref) => {
        const fallbackRef = useRef<SVGSVGElement>(null);

        const handleError = useCallback(
            (e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = "none";
                if (!fallbackRef || !fallbackRef.current) return;
                fallbackRef.current.style.display = "block";
            },
            []
        );

        const handleLoad = useCallback(
            (e: SyntheticEvent<HTMLImageElement>) => {
                onLoad?.(e);

                e.currentTarget.style.display = "block";
                e.currentTarget.style.visibility = "visible";
            },
            [onLoad]
        );

        return (
            <>
                <NoImageIcon
                    ref={fallbackRef}
                    height="100%"
                    width="100%"
                    style={{
                        display: "none",
                        padding: "10px",
                        aspectRatio,
                    }}
                />

                <StyledImg
                    ref={ref}
                    src={src!}
                    alt={alt}
                    loading="lazy"
                    width="100%"
                    height="100%"
                    style={{
                        visibility: "hidden",
                        aspectRatio,
                        ...style,
                    }}
                    onLoad={handleLoad}
                    onError={handleError}
                    {...props}
                />
            </>
        );
    }
);

BaseImage.displayName = "Image";

export type { ImageProps };
export default BaseImage;
