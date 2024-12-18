import { useState, useMemo, useCallback, FC } from "react";
import { ColorSegment, SegmentBar } from "./styled";

const getColorSegments = (baseColor: string): string[] => {
    const hsl = baseColor.match(/\d+/g)?.map(Number) || [];
    const hue = hsl[0];

    return Array.from({ length: 5 }, (_, i) => {
        const lightness = 90 - i * 20;
        return `hsl(${hue}, 100%, ${lightness}%)`;
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
                    key={index}
                    selected={selectedSegment === index}
                    sx={{ backgroundColor: color }}
                    onClick={() => handleSegmentSelect(index, color)}
                />
            ))}
        </SegmentBar>
    );
};

export default SegmentPicker;
