import { forwardRef } from "react";
import Form, { FormProps, FormRef } from "./Form";
import Actions from "./Actions";
import Content from "./Content";

interface Props extends Omit<FormProps, "children"> {}

const CreateUpdateForm = forwardRef<FormRef, Props>((props, ref) => (
    <Form ref={ref} {...props}>
        <Content />
        <Actions event={props.event} onClose={props.onClose} />
    </Form>
));

export type { FormRef };
export default CreateUpdateForm;
