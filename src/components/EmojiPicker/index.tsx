import Emoji from "./Emoji";
import Root from "./styled/Root";
import CategoryHeader from "./CategoryHeader";
import Viewport from "./styled/Viewport";
import List from "./styled/List";
import { EmojiPickerRootProps, Emoji as TEmoji } from "frimousse";
import { FC } from "react";

interface EmojiPickerProps extends EmojiPickerRootProps {}

const EmojiPicker: FC<EmojiPickerProps> = (props) => {
    return (
        <Root {...props}>
            <Viewport>
                <List components={{ CategoryHeader, Emoji }} />
            </Viewport>
        </Root>
    );
};

export type { EmojiPickerProps, TEmoji };
export default EmojiPicker;
