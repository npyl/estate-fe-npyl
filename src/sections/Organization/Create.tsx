import Container from "@mui/material/Container";
import OrganizationForm from "./Form";
import { Paper } from "@mui/material";
import { useCallback } from "react";
import { useRouter } from "next/router";

const Create = () => {
    const router = useRouter();

    const onCreate = useCallback(
        (id: number) => router.push(`/organizations/${id}`),
        []
    );
    const onCancel = useCallback(() => router.back(), []);

    return (
        <Container
            maxWidth="sm"
            component={Paper}
            sx={{
                py: 2,
            }}
        >
            <OrganizationForm onCreate={onCreate} onCancel={onCancel} />
        </Container>
    );
};

export default Create;
