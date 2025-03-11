import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import { useEditorContext } from "./context";
import MenuBar from "./MenuBar";
import { Paper } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";

// --------------------------------------------------------------------

interface IsRangeProps {
    from: number;
    to: number;
}

const isRange = ({ from, to }: IsRangeProps) => from !== to;

// --------------------------------------------------------------------

const BubbleMenu = () => {
    const { editor } = useEditorContext();

    return (
        <TiptapBubbleMenu
            editor={editor}
            tippyOptions={{
                delay: 200,
            }}
            shouldShow={isRange}
        >
            <MenuBar
                component={Paper}
                width="fit-content"
                p={1}
                border="1px solid"
                borderColor={getBorderColor2}
            />
        </TiptapBubbleMenu>
    );
};

export default BubbleMenu;
