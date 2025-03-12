import { FC } from "react";

import TextFormat from "./TextFormat";
import Stack, { StackProps } from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Indentation from "./Indentation";
import TextStyles from "./TextStyles";
import Lists from "./Lists";
import Alignment from "./Alignment";
import Emoji from "./Emoji";
import Color from "./Color";

const MenuBar: FC<StackProps> = (props) => (
    <Stack
        alignItems="center"
        direction="row"
        spacing={1}
        px={0.5}
        overflow="auto hidden"
        {...props}
    >
        <TextFormat />
        <Divider orientation="vertical" flexItem />
        <TextStyles />
        <Color />
        <Divider orientation="vertical" flexItem />
        <Alignment />
        <Divider orientation="vertical" flexItem />
        <Lists />
        <Divider orientation="vertical" flexItem />
        <Indentation />
        <Divider orientation="vertical" flexItem />
        <Emoji />
    </Stack>
);

export default MenuBar;
