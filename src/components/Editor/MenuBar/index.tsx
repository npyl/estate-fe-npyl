import { FC } from "react";

import TextFormatSelect from "./TextFormatSelect";
import Stack, { StackProps } from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Indentation from "./Indentation";
import TextStyles from "./TextStyles";
import Lists from "./Lists";
import Alignment from "./Alignment";
import Emoji from "./Emoji";

const MenuBar: FC<StackProps> = (props) => (
    <Stack alignItems="center" direction="row" spacing={1} px={0.5} {...props}>
        <TextStyles />
        <Divider orientation="vertical" flexItem />
        <TextFormatSelect />
        <Divider orientation="vertical" flexItem />
        <Lists />
        <Divider orientation="vertical" flexItem />
        <Alignment />
        <Divider orientation="vertical" flexItem />
        <Indentation />
        <Divider orientation="vertical" flexItem />
        <Emoji />
    </Stack>
);

export default MenuBar;
