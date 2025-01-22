import Stack from "@mui/material/Stack";
import Bar from "./Bar";
import ParamLooker from "./ParamLooker";
import { FiltersProvider } from "@/sections/Tasks/filters";
import Content from "./Content";
import { CookiesProvider } from "react-cookie";
import NotificationHandler from "./NotificationHandler";

function ViewAllTasks() {
    return (
        <>
            <FiltersProvider>
                <CookiesProvider>
                    <Stack spacing={1}>
                        <Bar />
                        <Content />
                    </Stack>
                </CookiesProvider>
            </FiltersProvider>

            {/* Handle search params */}
            <ParamLooker />

            <NotificationHandler />
        </>
    );
}

export default ViewAllTasks;
