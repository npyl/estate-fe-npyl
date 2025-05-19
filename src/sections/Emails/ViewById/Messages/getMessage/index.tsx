import { TThreadMessage } from "@/types/email";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import Attachments from "./Attachments";
import Body from "./Body";
import { getBorderColor2 } from "@/theme/borderColor";

interface Props {
    m: TThreadMessage;
    last: boolean;
}

const Message: FC<Props> = ({ m, last }) => {
    const { from, date, body, attachments } = m || {};

    const borderBottom = last ? "" : "1px solid";

    return (
        <Stack
            p={2}
            spacing={2}
            borderBottom={borderBottom}
            borderColor={getBorderColor2}
        >
            <Header from={from} date={date} />
            <Body body={body} />
            <Attachments attachments={attachments} />
        </Stack>
    );
};

const getMessage = (count: number) => (m: TThreadMessage, idx: number) => (
    <Message key={m.id} m={m} last={idx === count - 1} />
);

export default getMessage;
