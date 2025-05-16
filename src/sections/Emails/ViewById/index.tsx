import { FC } from "react";
import Messages from "./Messages";
import Container from "./Container";

interface Props {
    id: string;
}

const ViewById: FC<Props> = ({ id }) => (
    <Container threadId={id}>
        <Messages threadId={id} />
    </Container>
);

export default ViewById;
