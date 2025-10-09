import { forwardRef } from "react";

const DialogForm = forwardRef<HTMLFormElement>((props, ref) => (
    <form ref={ref} {...props} method="POST" />
));

DialogForm.displayName = "DialogForm";

export default DialogForm;
