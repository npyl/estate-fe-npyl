import { Toaster as RHTToaster, Toast as RHTToast } from "react-hot-toast";
import Toast from "./Toast";

// ----------------------------------------------------------------------------

const getToast = (t: RHTToast) => <Toast t={t} />;

// ----------------------------------------------------------------------------

const Toaster = () => <RHTToaster position="top-right">{getToast}</RHTToaster>;

// ----------------------------------------------------------------------------

export { default as errorToast } from "./toasts/error";
export { default as successToast } from "./toasts/success";
export { default as infoToast } from "./toasts/info";
export { default as uploadToast } from "./toasts/upload";
export default Toaster;
