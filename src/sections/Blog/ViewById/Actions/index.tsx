import Stack from "@mui/material/Stack";
import PublishTo from "./PublishTo";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";

const Actions = () => (
    <Stack direction="row" justifyContent="flex-end" spacing={1} mt={1}>
        <CancelButton />
        <PublishTo />
        <SaveButton />
    </Stack>
);

export default Actions;
