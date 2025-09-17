import { getBorderColor2 } from "@/theme/borderColor";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";

interface StyledStackProps extends StackProps {}

const StyledStack: FC<StyledStackProps> = (props) => (
    <Stack
        height={1}
        bgcolor="background.paper"
        borderRadius={1}
        border="1px solid"
        borderColor={getBorderColor2}
        {...props}
    />
);

export type { StyledStackProps };
export default StyledStack;
