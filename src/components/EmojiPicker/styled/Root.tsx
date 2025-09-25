import { styled } from "@mui/material/styles";
import { EmojiPicker } from "frimousse";

const Root = styled(EmojiPicker.Root)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    height: "352px",
    background: theme.palette.mode === "dark" ? "#171717" : "#fff",
    isolation: "isolate",
}));

export default Root;
