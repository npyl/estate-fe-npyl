import Emoji from "./Emoji";
import Root from "./styled/Root";
import CategoryHeader from "./CategoryHeader";
import Viewport from "./styled/Viewport";
import List from "./styled/List";

const PPEmojiPicker = () => {
    return (
        <Root>
            <Viewport>
                <List components={{ CategoryHeader, Emoji }} />
            </Viewport>
        </Root>
    );
};

export default PPEmojiPicker;
