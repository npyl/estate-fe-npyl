import Stack from "@mui/material/Stack";
import TextAlignButton from "./TextAlignButton";

const Alignment = () => (
    <Stack direction="row" alignItems="center">
        <TextAlignButton textAlign="left" />
        <TextAlignButton textAlign="center" />
        <TextAlignButton textAlign="right" />
        <TextAlignButton textAlign="justify" />
    </Stack>
);

export default Alignment;
