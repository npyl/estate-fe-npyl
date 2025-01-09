import { createContext, useContext } from "react";
import { useSetIntegrationOrderedImagesMutation } from "@/services/integrations";

type TSetOrderedImages = ReturnType<
    typeof useSetIntegrationOrderedImagesMutation
>[0];

export interface IntegrationsOperationsState {
    isLoading: boolean;
    setOrderedImages: TSetOrderedImages;
}

export const IntegrationsOperationsContext = createContext<
    IntegrationsOperationsState | undefined
>(undefined);

export const useIntegrationsOperations = () => {
    const context = useContext(IntegrationsOperationsContext);
    if (context === undefined) {
        throw new Error(
            "ImageOperationsContext value is undefined. Make sure you use the ImageOperationsContext before using the context."
        );
    }
    return context;
};

export const IntegrationsOperationsProvider: React.FC<
    React.PropsWithChildren<unknown>
> = (props) => {
    // set
    const [setOrderedImages, { isLoading }] =
        useSetIntegrationOrderedImagesMutation();

    return (
        <IntegrationsOperationsContext.Provider
            value={{
                isLoading,
                // ...
                setOrderedImages,
            }}
            {...props}
        />
    );
};
