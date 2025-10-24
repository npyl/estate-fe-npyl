import Box from "@mui/material/Box";
import Actions from "./Actions";
import Content from "./Content";
import Form from "./Form";
import Title from "./Title";

const CreateOrEdit = () => (
    <Form>
        <Box>
            <Title />
            <Box mt={3} />
            <Content />
            <Actions />
        </Box>
    </Form>
);

export default CreateOrEdit;
