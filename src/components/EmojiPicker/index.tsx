import Root from "./styled/Root";
import CategoryHeader from "./CategoryHeader";
import Viewport from "./styled/Viewport";
import List from "./styled/List";
import { EmojiPickerRootProps, Emoji as TEmoji } from "frimousse";
import { FC, useRef } from "react";
import Tooltip, { TooltipRef } from "./Tooltip";
import useEmoji from "./useEmoji";

interface EmojiPickerProps extends EmojiPickerRootProps {}

const EmojiPicker: FC<EmojiPickerProps> = (props) => {
    const tooltipRef = useRef<TooltipRef>(null);
    const Emoji = useEmoji(tooltipRef);

    return (
        <Root {...props}>
            <Viewport>
                <Tooltip ref={tooltipRef} />
                <List components={{ CategoryHeader, Emoji }} />
            </Viewport>
        </Root>
    );
};

export type { EmojiPickerProps, TEmoji };
export default EmojiPicker;
