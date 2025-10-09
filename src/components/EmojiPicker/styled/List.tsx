import { styled } from "@mui/material/styles";
import { EmojiPicker } from "frimousse";

const List = styled(EmojiPicker.List)({
    userSelect: "none",
    display: "flex",
    flexDirection: "row",
});

export default List;
