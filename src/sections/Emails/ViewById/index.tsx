import { FC } from "react";
import Messages from "./Messages";
import Container from "./Container";

interface Props {
    id: string;
    onBack: VoidFunction;
}

const ViewById: FC<Props> = ({ id, onBack }) => (
    <Container threadId={id} onBack={onBack}>
        <Messages threadId={id} />
    </Container>
);

export default ViewById;
