import Stack from "@mui/material/Stack";
import Head0 from "./Head/Head0";
import Head1 from "./Head/Head1";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { getBorderColor2 } from "@/theme/borderColor";
import FullPaper from "./FullPaper";
import { SelectedConversationProvider } from "./SelectedConversation";
import HideWithConversationStack from "./_shared/HideWithConvesationStack";
import HideWithoutConversationStack from "./_shared/HideWithoutConversationStack";

const MessagesSection = () => (
    <FullPaper elevation={7}>
        <SelectedConversationProvider>
            <Stack direction="row" alignItems="center" height={1}>
                <HideWithConversationStack
                    width={{ xs: "100%", md: "30%" }}
                    height={1}
                    borderRight="1px solid"
                    borderColor={getBorderColor2}
                >
                    <Head0 />
                    <Sidebar />
                </HideWithConversationStack>
                <HideWithoutConversationStack
                    width={{ xs: "100%", md: "70%" }}
                    height={1}
                >
                    <Head1 />
                    <Content />
                </HideWithoutConversationStack>
            </Stack>
        </SelectedConversationProvider>
    </FullPaper>
);

export default MessagesSection;
