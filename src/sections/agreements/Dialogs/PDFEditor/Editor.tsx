import { useForm } from "./hook";
import { useRef } from "react";

const PDFEditor = () => {
    const formRef = useRef<HTMLDivElement>(null);

    useForm(formRef);

    return <div ref={formRef} />;
};

export default PDFEditor;
