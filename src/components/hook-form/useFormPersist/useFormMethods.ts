import { useCallback } from "react";
import {
    FieldValues,
    UseFormHandleSubmit,
    UseFormReturn,
    UseFormSetValue,
} from "react-hook-form";
import { PROMISE_ERROR } from "./constant";

const useFormMethods = <
    TFieldValues extends FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined
>(
    methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>,
    onChange: (key: string, value: any) => void,
    onSubmitSuccess: VoidFunction
) => {
    const setValue: UseFormSetValue<TFieldValues> = useCallback(
        (key, value, options) => {
            // update (source of truth)
            methods.setValue(key, value, options);
            onChange(key, value);
        },
        [onChange]
    );

    const handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues> =
        useCallback(
            (onValid, onInvalid) => async (e) => {
                /**
                 * Wrapper around passed onValid to await-and-clear cookie after successful submit
                 */
                const onAwaitedValid = async (data: TFieldValues) => {
                    const res = await onValid(data);

                    if (typeof res !== "boolean") {
                        throw new Error(PROMISE_ERROR);
                    }

                    // INFO: do nothing on fail
                    if (!res) return;

                    onSubmitSuccess();
                };

                return methods.handleSubmit(
                    onAwaitedValid as any,
                    onInvalid
                )(e);
            },
            [methods.handleSubmit, onSubmitSuccess]
        );

    const originalRegister = methods.control.register;
    methods.control.register = (name, options) => {
        const field = originalRegister.call(
            methods.control,
            name,
            options as any
        );

        const originalOnChange = field.onChange;
        field.onChange = (event) => {
            // ----------------------------------------------
            // Update state (source of truth)
            // ----------------------------------------------
            const res = originalOnChange(event);

            // ----------------------------------------------
            const value = event.target.value;
            onChange(name, value);
            // ----------------------------------------------

            return res;
        };

        return field as any;
    };

    return { ...methods, setValue, handleSubmit };
};

export default useFormMethods;
