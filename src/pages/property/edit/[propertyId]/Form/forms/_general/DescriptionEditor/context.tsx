import {
    useGenerateDescriptionMutation,
    useImproveDescriptionMutation,
} from "@/services/properties";
import { useTranslateMutation } from "@/services/translate";
import { createContext, useContext } from "react";

type TTranslateDescription = ReturnType<typeof useTranslateMutation>[0];
type TGenerateDescription = ReturnType<
    typeof useGenerateDescriptionMutation
>[0];
type TImproveDescription = ReturnType<typeof useImproveDescriptionMutation>[0];

type State = {
    isLoading: boolean;
    translate: TTranslateDescription;
    generateDescription: TGenerateDescription;
    improveDescription: TImproveDescription;
};

const OperationsContext = createContext<State | undefined>(undefined);

export const useOperationsContext = () => {
    const context = useContext(OperationsContext);
    if (context === undefined) {
        throw new Error(
            "OperationsContext value is undefined. Make sure you use the OperationsContext before using the context."
        );
    }
    return context;
};

export const OperationsProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const [translate, { isLoading: isTranslating }] = useTranslateMutation();

    const [generateDescription, { isLoading: isGenerating }] =
        useGenerateDescriptionMutation();
    const [improveDescription, { isLoading: isImproving }] =
        useImproveDescriptionMutation();

    const isLoading = isTranslating || isGenerating || isImproving;

    return (
        <OperationsContext.Provider
            value={{
                isLoading,
                translate,
                generateDescription,
                improveDescription,
            }}
            {...props}
        />
    );
};
