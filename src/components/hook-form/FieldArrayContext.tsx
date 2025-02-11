import { createContext, PropsWithChildren, useContext } from "react";
import {
    ArrayPath,
    FieldValues,
    useFieldArray,
    UseFieldArrayReturn,
    useFormContext,
} from "react-hook-form";

type TState<T extends FieldValues> = UseFieldArrayReturn<T, ArrayPath<T>, "id">;

const FieldArrayContext = createContext<TState<any> | undefined>(undefined);

export const useFieldArrayContext = () => {
    const context = useContext(FieldArrayContext);
    if (context === undefined) {
        throw new Error(
            "FieldArrayContext value is undefined. Make sure you use the FieldArrayProvider before using the context."
        );
    }
    return context;
};

interface Props<T extends FieldValues> extends PropsWithChildren {
    name: ArrayPath<T>;
}

const FieldArrayProvider = <T extends FieldValues>({
    name,
    children,
}: Props<T>) => {
    const { control } = useFormContext<T>();
    const state = useFieldArray({
        name,
        control,
    });

    return (
        <FieldArrayContext.Provider value={state}>
            {children}
        </FieldArrayContext.Provider>
    );
};

export { FieldArrayProvider };
