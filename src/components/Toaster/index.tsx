import { Toaster as RHTToaster, Toast as RHTToast } from "react-hot-toast";
import Toast from "./Toast";

// ----------------------------------------------------------------------------

const getToast = (t: RHTToast) => <Toast t={t} />;

// ----------------------------------------------------------------------------

const Toaster = () => <RHTToaster position="top-right">{getToast}</RHTToaster>;

export default Toaster;
