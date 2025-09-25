import { styled } from "@mui/material/styles";
import { EmojiPicker } from "frimousse";

const List = styled(EmojiPicker.List)(({ theme }) => ({
    paddingBlockEnd: "12px",
    userSelect: "none",
}));

export default List;
