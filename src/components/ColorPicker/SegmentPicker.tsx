import { useState, useMemo, useCallback, FC } from "react";
import { ColorSegment, SegmentBar } from "./styled";

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const getColorSegments = (baseColor: string): string[] => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return [];

    return Array.from({ length: 5 }, (_, i) => {
        const factor = 1 - i * 0.2;
        const r = Math.round(
            Math.min(255, rgb.r + (255 - rgb.r) * (1 - factor))
        );
        const g = Math.round(
            Math.min(255, rgb.g + (255 - rgb.g) * (1 - factor))
        );
        const b = Math.round(
            Math.min(255, rgb.b + (255 - rgb.b) * (1 - factor))
        );
        return rgbToHex(r, g, b);
    });
};

interface SegmentPickerProps {
    baseColor: string;
    onColorChange?: (c: string) => void;
}

const SegmentPicker: FC<SegmentPickerProps> = ({
    baseColor,
    onColorChange,
}) => {
    const segments = useMemo(() => getColorSegments(baseColor), [baseColor]);
    const [selectedSegment, setSelectedSegment] = useState<number>();

    const handleSegmentSelect = useCallback(
        (index: number, color: string) => {
            setSelectedSegment(index);
            onColorChange?.(color);
        },
        [onColorChange]
    );

    return (
        <SegmentBar>
            {segments.map((color, index) => (
                <ColorSegment
                    key={color}
                    selected={selectedSegment === index}
                    sx={{ backgroundColor: color }}
                    onClick={() => handleSegmentSelect(index, color)}
                />
            ))}
        </SegmentBar>
    );
};

export default SegmentPicker;
