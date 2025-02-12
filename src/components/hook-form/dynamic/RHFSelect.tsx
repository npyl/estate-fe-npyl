import RHFSelect, { RHFSelectProps } from "../RHFSelect";
import WithDynamicName from "./WithDynamicName";

export type { RHFSelectProps };
export default WithDynamicName<RHFSelectProps<any>>(RHFSelect);
