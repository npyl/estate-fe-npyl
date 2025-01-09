import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MuiTextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

const SendButton = () => (
    <IconButton>
        <SendIcon />
    </IconButton>
);

const TextField = () => (
    <Stack direction="row" spacing={1} p={1} justifySelf="flex-end">
        <MuiTextField fullWidth InputProps={{ sx: { borderRadius: "16px" } }} />
        <SendButton />
    </Stack>
);

export default TextField;
