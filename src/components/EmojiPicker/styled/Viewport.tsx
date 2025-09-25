import { styled } from "@mui/material/styles";
import { EmojiPicker } from "frimousse";

const Viewport = styled(EmojiPicker.Viewport)(({ theme }) => ({
    position: "relative",
    flex: 1,
    outline: "none",
}));

export default Viewport;
