import {
    useFormContext,
    useWatch,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";
import { useCallback } from "react";

const useValueChange = <
    StateType extends FieldValues,
    K extends Path<StateType>,
>(
    name: K
) => {
    const { setValue } = useFormContext<StateType>();
    const value = useWatch<StateType>({ name }) as PathValue<StateType, K>;
    const defaultValues = useFormContext<StateType>().formState
        .defaultValues as StateType;

    const onChange = useCallback(
        (v: any) => {
            setValue(name, v, { shouldDirty: true });
        },
        [name, setValue]
    );

    const onClear = useCallback(
        () => onChange(defaultValues[name as keyof StateType]),
        [name, onChange, defaultValues]
    );

    return [value, onChange, onClear] as const;
};

export default useValueChange;
