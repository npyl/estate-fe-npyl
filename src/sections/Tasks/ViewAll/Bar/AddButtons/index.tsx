import Stack from "@mui/material/Stack";
import { FC } from "react";
import CreateTaskButton from "./CreateTask";
import CreateColumnButton from "./CreateColumn";

interface AddButtonsProps {
    create?: boolean;
}

const AddButtons: FC<AddButtonsProps> = ({ create = false }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
        <CreateTaskButton create={create} />
        <CreateColumnButton />
    </Stack>
);

export default AddButtons;
