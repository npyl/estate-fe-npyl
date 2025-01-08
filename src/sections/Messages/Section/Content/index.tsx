import Stack from "@mui/material/Stack";
import { useSelectedUserContext } from "../SelectedUser";
import dynamic from "next/dynamic";
const NotSelectedPlaceholder = dynamic(
    () => import("./NotSelectedPlaceholder")
);
const UserChat = dynamic(() => import("./UserChat"));

const MessageContent = () => {
    const { userId } = useSelectedUserContext();

    const isSelected = Boolean(userId);

    return (
        <Stack>
            {!isSelected ? <NotSelectedPlaceholder /> : null}
            {isSelected ? <UserChat /> : null}
        </Stack>
    );
};

export default MessageContent;
