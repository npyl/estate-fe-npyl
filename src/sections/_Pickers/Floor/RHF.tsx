import { useFormContext, useWatch } from "react-hook-form";
import FloorPicker from ".";
import { FC, useCallback } from "react";

interface Props {
    minName: string;
    maxName: string;
}

const RHFFloorPicker: FC<Props> = ({ minName, maxName }) => {
    const { setValue } = useFormContext();

    const min = useWatch({ name: minName });
    const max = useWatch({ name: maxName });

    const onMinChange = useCallback(
        (k?: string) => setValue(minName, k, { shouldDirty: true }),
        []
    );
    const onMaxChange = useCallback(
        (k?: string) => setValue(maxName, k, { shouldDirty: true }),
        []
    );
    const onReset = useCallback(() => {
        setValue(minName, undefined, { shouldDirty: true });
        setValue(maxName, undefined, { shouldDirty: true });
    }, []);

    return (
        <FloorPicker
            min={min}
            max={max}
            onMinChange={onMinChange}
            onMaxChange={onMaxChange}
            onReset={onReset}
        />
    );
};

export default RHFFloorPicker;
