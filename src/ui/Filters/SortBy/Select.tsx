import { hideTextStyled } from "@/components/styled";
import PPSelect, { SelectProps } from "@/components/Select";

const Select = hideTextStyled(PPSelect<string>);

export type { SelectProps };
export default Select;
