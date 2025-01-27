import Stack from "@mui/material/Stack";
import Bar from "./Bar";
import ParamLooker from "./ParamLooker";
import { FiltersProvider } from "@/sections/Tasks/filters";
import Content from "./Content";
import { CookiesProvider } from "react-cookie";
import NotificationHandler from "./NotificationHandler";
import { FC } from "react";

interface ViewAllTasksProps {
    create?: boolean;
}

const ViewAllTasks: FC<ViewAllTasksProps> = ({ create }) => {
    return (
        <>
            <FiltersProvider>
                <CookiesProvider>
                    <Stack spacing={1}>
                        <Bar create={create} />
                        <Content />
                    </Stack>
                </CookiesProvider>
            </FiltersProvider>

            {/* Handle search params */}
            <ParamLooker />

            <NotificationHandler />
        </>
    );
};

export default ViewAllTasks;
