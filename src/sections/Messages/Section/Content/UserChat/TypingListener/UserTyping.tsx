import Avatar from "@/components/Avatar";
import { useGetUserQuery } from "@/services/user";
import { toNumberSafe } from "@/utils/toNumber";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import TypingAnimation from "./TypingAnimation";

interface UserTypingProps {
    userId: string;
}

const UserTyping: FC<UserTypingProps> = ({ userId }) => {
    const iUserId = toNumberSafe(userId);

    const { data } = useGetUserQuery(iUserId);
    const { avatar, firstName, lastName } = data || {};

    return (
        <Stack direction="row" spacing={0.5} px={2}>
            <Avatar
                src={avatar}
                firstName={firstName}
                lastName={lastName}
                sx={{
                    width: "30px",
                    height: "30px",
                }}
            />

            <TypingAnimation />
        </Stack>
    );
};

export default UserTyping;
