import Container from "@mui/material/Container";
import OrganizationForm from "./Form";
import { Paper } from "@mui/material";

const Create = () => (
    <Container
        maxWidth="sm"
        component={Paper}
        sx={{
            py: 2,
        }}
    >
        <OrganizationForm onCancel={() => {}} />
    </Container>
);

export default Create;
