import Stack from "@mui/material/Stack";
import Head0 from "./Head/Head0";
import Head1 from "./Head/Head1";
import Sidebar from "./Sidebar";
import Content from "./Content";
import FullStack from "./FullStack";
import { SelectedConversationProvider } from "./SelectedConversation";
import HideWithConversationStack from "./_shared/HideWithConvesationStack";
import HideWithoutConversationStack from "./_shared/HideWithoutConversationStack";
import { FC, PropsWithChildren } from "react";
import { CreateConversationProvider } from "./CreateConversation";

const Providers: FC<PropsWithChildren> = ({ children }) => (
    <SelectedConversationProvider>{children}</SelectedConversationProvider>
);

const MessagesSection = () => (
    <FullStack>
        <Providers>
            <Stack direction="row" alignItems="center" height={1} gap={1}>
                <HideWithConversationStack width={{ xs: "100%", md: "30%" }}>
                    <Head0 />
                    <Sidebar />
                </HideWithConversationStack>

                <HideWithoutConversationStack width={{ xs: "100%", md: "70%" }}>
                    <CreateConversationProvider>
                        <Head1 />
                        <Content />
                    </CreateConversationProvider>
                </HideWithoutConversationStack>
            </Stack>
        </Providers>
    </FullStack>
);

export default MessagesSection;
