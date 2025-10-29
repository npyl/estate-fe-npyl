import Box from "@mui/material/Box";
import Actions from "./Actions";
import Content from "./Content";
import Form from "./Form";
import Title from "./Title";
import { FC } from "react";

interface CreateOrEditProps {
    roleId?: number;
    onCancel: VoidFunction;
}

const CreateOrEdit: FC<CreateOrEditProps> = ({ roleId, onCancel }) => (
    <Form roleId={roleId}>
        <Box p={2}>
            <Title />
            <Box mt={3} />
            <Content />
            <Actions onCancel={onCancel} />
        </Box>
    </Form>
);

export default CreateOrEdit;
