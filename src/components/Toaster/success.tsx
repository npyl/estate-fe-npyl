import orgToast from "react-hot-toast";
import Message from "./Message";

const successToast = (main: string, secondary?: string) =>
    orgToast.success(<Message main={main} secondary={secondary} />);

export default successToast;
