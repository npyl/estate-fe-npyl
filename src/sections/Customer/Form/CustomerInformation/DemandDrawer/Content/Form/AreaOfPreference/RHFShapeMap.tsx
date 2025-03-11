import { FC, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Map from "@/components/Map";
import { DrawShape, IMapProps, StopDraw } from "@/components/Map/types";
import { areShapesEqual, drawingToPoints } from "@/components/Map/util";
import { TShape } from "@/types/shape";
import { IDemandForms } from "../../../Form";
import WithDynamicName from "@/components/hook-form/dynamic/WithDynamicName";

// -------------------------------------------------------------------------------------

interface RenderProps extends Omit<IMapProps, "shapes" | "onShapeChange"> {
    value: TShape[];
    onChange: (s: TShape[]) => void;
}

const Render: FC<RenderProps> = ({ value, onChange, ...props }) => {
    const onDraw = useCallback(
        (s: DrawShape | StopDraw) => {
            if (!s) onChange([]);
            else {
                const newS = drawingToPoints(s);
                onChange([...value, newS]);
            }
        },
        [onChange]
    );

    const onShapeChange = useCallback(
        (old: TShape, newS: TShape) => {
            const updated = value.map((s) =>
                areShapesEqual(s, old) ? newS : s
            );

            onChange(updated);
        },
        [onChange]
    );

    return (
        <Map
            shapes={value as unknown as TShape[]}
            onDraw={onDraw}
            onShapeChange={onShapeChange}
            {...props}
        />
    );
};

// -------------------------------------------------------------------------------------

interface RHFShapeMapProps extends Omit<RenderProps, "value" | "onChange"> {
    name: keyof IDemandForms;
}

const RHFShapeMap: FC<RHFShapeMapProps> = ({ name, ...props }) => {
    const { control } = useFormContext<IDemandForms>();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <Render
                    value={value as unknown as TShape[]}
                    onChange={onChange}
                    {...props}
                />
            )}
        />
    );
};

// -------------------------------------------------------------------------------------

export default WithDynamicName(RHFShapeMap);
