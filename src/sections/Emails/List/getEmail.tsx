import { TEmailRes } from "@/types/email";
import Stack from "@mui/material/Stack";
import { FC } from "react";

interface EmailItemProps {
    e: TEmailRes;
}

const EmailItem: FC<EmailItemProps> = ({ e }) => {
    return (
        <Stack>
            {e.id}
            {e.raw}
        </Stack>
    );
};

const getEmail = (e: TEmailRes) => <EmailItem e={e} />;

export default getEmail;
