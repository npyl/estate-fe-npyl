import { createContext, FC, PropsWithChildren, useContext } from "react";

interface PDFEditorState {
    reloadInputs: VoidFunction;
}

const PDFEditorContext = createContext<PDFEditorState>({
    reloadInputs: () => {},
});

export const usePDFEditorContext = () => {
    const context = useContext(PDFEditorContext);
    if (context === undefined) {
        throw new Error(
            "PDFEditorContext value is undefined. Make sure you use the PDFEditorContext before using the context."
        );
    }
    return context;
};

interface PDFEditorContextProps extends PropsWithChildren {
    reloadInputs: VoidFunction;
}

const PDFEditorProvider: FC<PDFEditorContextProps> = ({
    reloadInputs,
    ...props
}) => (
    <PDFEditorContext.Provider
        value={{
            reloadInputs,
        }}
        {...props}
    />
);

export { PDFEditorProvider };
