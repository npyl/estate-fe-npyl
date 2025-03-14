import MenuBar from "@/components/Editor/MenuBar";
import { Paper } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";
import Loader from "./Loader";
import { FC } from "react";
import Link from "../MenuBar/Link";
import { Editor } from "@tiptap/core";
import { ShouldShowProps } from "./types";

// --------------------------------------------------------------------

const isInViewport = (element: HTMLDivElement): boolean => {
    const rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
};

const isRange = (from: number, to: number) => from !== to;
const isLink = (editor: Editor) => editor?.isActive("link");

const shouldShow0 =
    (menubar: HTMLDivElement) =>
    ({ from, to, editor }: ShouldShowProps) =>
        isRange(from, to) && !isLink(editor) && !isInViewport(menubar);

const shouldShow1 = ({ editor }: ShouldShowProps) => isLink(editor);

// --------------------------------------------------------------------

interface BubbleMenuProps {
    menubar: HTMLDivElement;
}

const BubbleMenu: FC<BubbleMenuProps> = ({ menubar }) => (
    <>
        <Loader shouldShow={shouldShow0(menubar)}>
            <MenuBar
                bubble
                component={Paper}
                width="fit-content"
                border="1px solid"
                p={0.5}
                borderColor={getBorderColor2}
            />
        </Loader>

        <Loader shouldShow={shouldShow1}>
            <Link bubble menubar={isInViewport(menubar)} />
        </Loader>
    </>
);

export default BubbleMenu;
