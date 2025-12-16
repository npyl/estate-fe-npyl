import React, { useState, MouseEvent, useCallback, FC, useMemo } from "react";
import { ColorPickerWrapper, ColorSlider, SliderHandle } from "./styled";
import SegmentPicker from "./SegmentPicker";
import { BoxProps } from "@mui/material";
import { getColorFromPosition, getPositionFromColor } from "./utils";
import { getSafeHexColor } from "@/theme/colors";

interface ColorPickerProps extends BoxProps {
    color?: string;
    onColorChange?: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({
    color: _color,
    onColorChange,
    ...props
}) => {
    const color = useMemo(() => getSafeHexColor(_color), [_color]);
    const initialPosition = useMemo(() => getPositionFromColor(color), [color]);

    const [handlePosition, setHandlePosition] = useState(initialPosition);
    const [baseColor, setBaseColor] = useState(color);

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

export type { ColorPickerProps };
export default React.memo(ColorPicker);
