import { LightboxProps } from "yet-another-react-lightbox";

export const defaultFullscreenProps = {
    auto: false,
    ref: null,
};

export const resolveFullscreenProps = (
    fullscreen: LightboxProps["fullscreen"]
) => ({
    ...defaultFullscreenProps,
    ...fullscreen,
});
