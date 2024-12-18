import { useState, MouseEvent, useCallback, FC } from "react";
import { ColorPickerWrapper, ColorSlider, SliderHandle } from "./styled";
import SegmentPicker from "./SegmentPicker";

const getColorFromPosition = (position: number): string => {
    const hue = (position / 100) * 360;
    return `hsl(${hue}, 100%, 50%)`;
};

interface ColorPickerProps {
    color?: string;
    onColorChange?: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ color, onColorChange }) => {
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

    const handleDrag = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if (e.buttons === 1) {
            handleSliderClick(e);
        }
    }, []);

    return (
        <ColorPickerWrapper>
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
