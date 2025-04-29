import orgToast, { ToastOptions } from "react-hot-toast";
import Message from "../Message";

const successToast = (
    main: string,
    secondary?: string,
    options?: ToastOptions
) => orgToast.success(<Message main={main} secondary={secondary} />, options);

export default successToast;
