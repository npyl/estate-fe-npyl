import { useState, MouseEvent, useCallback, FC } from "react";
import { ColorPickerWrapper, ColorSlider, SliderHandle } from "./styled";
import SegmentPicker from "./SegmentPicker";
import { BoxProps } from "@mui/material";

const getColorFromPosition = (position: number): string => {
    const hue = (position / 100) * 360;
    // Convert HSL to Hex
    const h = hue / 360;
    const s = 1;
    const l = 0.5;

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hueToRgb(p, q, h) * 255);
    const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

    return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

interface ColorPickerProps extends BoxProps {
    color?: string;
    onColorChange?: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({
    color,
    onColorChange,
    ...props
}) => {
    const [handlePosition, setHandlePosition] = useState<number>(50);
    const [baseColor, setBaseColor] = useState<string>(
        color || getColorFromPosition(50)
    );

    const handleSliderClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const newPosition = (x / rect.width) * 100;
            setHandlePosition(Math.max(0, Math.min(100, newPosition)));

            const color = getColorFromPosition(newPosition);
            setBaseColor(color);
            onColorChange?.(color);
        },
        [onColorChange]
    );

    const handleDrag = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (e.buttons === 1) {
                handleSliderClick(e);
            }
        },
        [handleSliderClick]
    );

    return (
        <ColorPickerWrapper {...props}>
            <ColorSlider onClick={handleSliderClick} onMouseMove={handleDrag}>
                <SliderHandle left={handlePosition} />
            </ColorSlider>

            <SegmentPicker
                baseColor={baseColor}
                onColorChange={onColorChange}
            />
        </ColorPickerWrapper>
    );
};

export default ColorPicker;
