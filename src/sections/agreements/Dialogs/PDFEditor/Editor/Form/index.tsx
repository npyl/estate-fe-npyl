import useDialog from "@/hooks/useDialog";
import useForm from "./useForm";
import { forwardRef, HTMLAttributes, useImperativeHandle, useRef } from "react";
import { KeyValuePair } from "./types";
import { Form as FormClass } from "@pdfme/ui";

type FormRef = FormClass | null;

interface FormProps extends HTMLAttributes<HTMLDivElement> {
    onInputChange: (p: KeyValuePair) => void;
}

const Form = forwardRef<FormRef, FormProps>(
    ({ onInputChange, children, ...props }, ref) => {
        const [isLoaded, setLoaded] = useDialog();

        const formRef = useRef<HTMLDivElement>(null);
        const form = useForm(formRef, setLoaded, onInputChange);

        useImperativeHandle(ref, () => form!, [form]);

        return (
            <div ref={formRef} {...props}>
                {/* If form is loaded, load any children */}
                {isLoaded ? children : null}
            </div>
        );
    }
);

export type { FormRef };
export default Form;
