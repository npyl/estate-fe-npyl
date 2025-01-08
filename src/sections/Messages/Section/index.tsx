import Stack from "@mui/material/Stack";
import Head0 from "./Head/Head0";
import Head1 from "./Head/Head1";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { getBorderColor2 } from "@/theme/borderColor";
import FullPaper from "./FullPaper";
import { SelectedUserProvider } from "./SelectedUser";

const MessagesSection = () => (
    <FullPaper elevation={7}>
        <SelectedUserProvider>
            <Stack direction="row" alignItems="center" height={1}>
                <Stack
                    width="20%"
                    height={1}
                    borderRight="1px solid"
                    borderColor={getBorderColor2}
                >
                    <Head0 />
                    <Sidebar />
                </Stack>
                <Stack width="80%" height={1}>
                    <Head1 />
                    <Content />
                </Stack>
            </Stack>
        </SelectedUserProvider>
    </FullPaper>
);

export default MessagesSection;
