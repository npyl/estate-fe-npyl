import { FC, useCallback } from "react";
import TextFormat from "./TextFormat";
import Stack, { StackProps } from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Indentation from "./Indentation";
import TextStyles from "./TextStyles";
import Lists from "./Lists";
import Alignment from "./Alignment";
import Emoji from "./Emoji";
import Color from "./Color";
import History from "./History";
import Link from "./Link";

const MENUBAR_CLASSNAME = "PPEditor-MenuBar";

interface MenuBarProps extends Omit<StackProps, "onLoad"> {
    bubble?: boolean; // Is it used inside bubble?
    onLoad?: (e: HTMLDivElement) => void;
}

const MenuBar: FC<MenuBarProps> = ({ bubble = false, onLoad, ...props }) => {
    const onRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (!node) return;
            onLoad?.(node);
        },
        [onLoad]
    );

    return (
        <Stack
            ref={onRef}
            className={MENUBAR_CLASSNAME}
            alignItems="center"
            direction="row"
            spacing={0.2}
            overflow="auto hidden"
            {...props}
        >
            <History bubble={bubble} />
            <Divider
                orientation="vertical"
                flexItem
                sx={{ display: bubble ? "none" : "block" }}
            />
            <TextFormat />
            <Divider orientation="vertical" flexItem />
            <TextStyles />
            <Divider orientation="vertical" flexItem />
            <Color />
            <Divider orientation="vertical" flexItem />
            <Alignment />
            <Divider orientation="vertical" flexItem />
            <Lists />
            <Divider orientation="vertical" flexItem />
            <Indentation />
            <Divider orientation="vertical" flexItem />
            <Link />
            <Emoji />
        </Stack>
    );
};

export { MENUBAR_CLASSNAME };
export default MenuBar;
