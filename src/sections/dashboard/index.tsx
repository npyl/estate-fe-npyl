import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetProfileQuery } from "src/services/user";
import { useRef } from "react";
import Tasks from "./Tasks";
import UserDetailList from "./UserDetailList";
import StickyCalendar from "./StickyCalendar";
import Stats from "./Stats";

// ----------------------------------------------------------------------

const Title = () => {
    const { t } = useTranslation();
    const { firstName, lastName } = useGetProfileQuery().data ?? {};

    const name = firstName && lastName ? `${lastName} ${firstName}` : "";

    return (
        <Stack spacing={0.2}>
            <Typography variant="h5">
                {t("Hello")}, {name}
            </Typography>

            <Typography color="text.secondary" maxWidth={{ md: "50%" }} pr={2}>
                {t("_WELCOME_")}
            </Typography>
        </Stack>
    );
};

// ----------------------------------------------------------------------

const Dashboard = () => {
    const startRef = useRef<HTMLDivElement>(null);

    return (
        <Stack spacing={1} pb={8}>
            <Stack position="relative" width={1} height={1} spacing={1}>
                <Title />

                <div ref={startRef} />

                <Stats />

                <StickyCalendar startRef={startRef} />
            </Stack>

            <UserDetailList />
            <Tasks />
        </Stack>
    );
};

export default Dashboard;
