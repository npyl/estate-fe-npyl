import { TEmailRes } from "@/types/email";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import Attachments from "./Attachments";
import Body from "./Body";
import getBorderColor from "@/theme/borderColor";

interface Props {
    m: TEmailRes;
    last: boolean;
}

const Message: FC<Props> = ({ m, last }) => {
    const { payload } = m || {};

    return (
        <Stack
            p={2}
            spacing={2}
            border="1px solid"
            borderColor={getBorderColor}
            borderRadius={1}
        >
            <Header headers={payload.headers ?? []} />
            <Body payload={payload} />
            <Attachments payload={payload} />
        </Stack>
    );
};

const getMessage = (count: number) => (m: TEmailRes, idx: number) => (
    <Message key={m.id} m={m} last={idx === count - 1} />
);

export default getMessage;
