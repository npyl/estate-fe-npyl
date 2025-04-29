import orgToast, { ToastOptions } from "react-hot-toast";
import Message from "../Message";

const infoToast = (main: string, secondary?: string, options?: ToastOptions) =>
    orgToast(<Message main={main} secondary={secondary} />, options);

export default infoToast;
