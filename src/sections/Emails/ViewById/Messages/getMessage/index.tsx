import { TThreadMessageRes } from "@/types/email";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import Attachments from "./Attachments";
import { getBorderColor2 } from "@/theme/borderColor";
import Reader from "@/components/Editor/Reader";

interface Props {
    m: TThreadMessageRes;
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
            <Reader content={body} />
            <Attachments attachments={attachments} />
        </Stack>
    );
};

const getMessage = (count: number) => (m: TThreadMessageRes, idx: number) => (
    <Message key={m.id} m={m} last={idx === count - 1} />
);

export default getMessage;
