import { IEmailRes } from "@/types/email";
import Stack from "@mui/material/Stack";
import { FC } from "react";

interface EmailItemProps {
    e: IEmailRes;
}

const EmailItem: FC<EmailItemProps> = ({ e }) => {
    return <Stack>{e.id}</Stack>;
};

const getEmail = (e: IEmailRes) => <EmailItem e={e} />;

export default getEmail;
