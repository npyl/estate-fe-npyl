import { FC } from "react";
import Stack, { StackProps } from "@mui/material/Stack";

interface ForceVisibleProps extends StackProps {}

const ForceVisible: FC<StackProps> = (props) => (
    <Stack overflow="visible" {...props} />
);

export type { ForceVisibleProps };
export default ForceVisible;
