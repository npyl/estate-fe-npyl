import { forwardRef } from "react";
import Form, { FormProps, FormRef } from "./Form";
import Actions from "./Actions";
import Content from "./Content";
import { SxProps, Theme } from "@mui/material";

const FormSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
};

interface Props extends Omit<FormProps, "children"> {}

const CreateUpdateForm = forwardRef<FormRef, Props>(({ sx, ...props }, ref) => (
    <Form ref={ref} sx={{ ...FormSx, ...sx }} {...props}>
        <Content />
        <Actions event={props.event} onClose={props.onClose} />
    </Form>
));

export type { FormRef };
export default CreateUpdateForm;
