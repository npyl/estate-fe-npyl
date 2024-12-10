import orgToast from "react-hot-toast";
import Message from "./Message";

const errorToast = (main: string, secondary?: string) =>
    orgToast.error(<Message main={main} secondary={secondary} />);

export default errorToast;
