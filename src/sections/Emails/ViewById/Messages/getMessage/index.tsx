import { TThreadMessageRes } from "@/types/email";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import { getBorderColor2 } from "@/theme/borderColor";
import Reader from "@/components/Editor/Reader";
import dynamic from "next/dynamic";
const Attachments = dynamic(() => import("./Attachments"));

interface Props {
    m: TThreadMessageRes;
    first: boolean;
    last: boolean;
}

const Message: FC<Props> = ({ m, first, last }) => {
    const { from, date, body, attachments } = m || {};

    const borderBottom = last && !first ? "" : "1px solid";

    return (
        <Stack
            p={1}
            px={2}
            borderBottom={borderBottom}
            borderColor={getBorderColor2}
        >
            <Header from={from} date={date} />
            <Reader content={body} />
            {attachments.length > 0 ? (
                <Attachments attachments={attachments} />
            ) : null}
        </Stack>
    );
};

const getMessage = (count: number) => (m: TThreadMessageRes, idx: number) => (
    <Message key={m.id} m={m} first={idx === 0} last={idx === count - 1} />
);

export default getMessage;
