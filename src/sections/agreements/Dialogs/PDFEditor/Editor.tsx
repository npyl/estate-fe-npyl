import useDialog from "@/hooks/useDialog";
import { useForm } from "./hook";
import { FC, PropsWithChildren, useRef } from "react";

const PDFEditor: FC<PropsWithChildren> = ({ children }) => {
    const [isLoaded, setLoaded] = useDialog();

    const formRef = useRef<HTMLDivElement>(null);

    useForm(formRef, setLoaded);

    return (
        <div ref={formRef}>
            {/* If form is loaded, load any children */}
            {isLoaded ? children : null}
        </div>
    );
};

export default PDFEditor;
