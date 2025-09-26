import Box, { BoxProps } from "@mui/material/Box";
import { FC } from "react";

interface ColorBoxProps extends BoxProps {}

const ColorBox: FC<ColorBoxProps> = (props) => (
    <Box width={25} height={25} borderRadius="100%" {...props} />
);

export type { ColorBoxProps };
export default ColorBox;
