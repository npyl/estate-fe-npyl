import { FC } from "react";
import Content from "./Content";
import PaperWithFullscreen from "./PaperWithFullscreen";
import Actions from "./Actions";
import Form, { FormProps } from "./Form";

interface MessageBoxProps extends Omit<FormProps, "children"> {}

const MessageBox: FC<MessageBoxProps> = (props) => {
    const threadMode = Boolean(props.threadId);

    return (
        <PaperWithFullscreen>
            <Form {...props}>
                <Content thread={threadMode} />
                <Actions onClose={props.onClose} />
            </Form>
        </PaperWithFullscreen>
    );
};

export default MessageBox;
