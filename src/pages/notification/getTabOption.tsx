import { Box, Tab, TabProps } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useGetNonViewedNotificationsCountQuery } from "@/services/notification";
import UnReadBadge from "./components/UnReadBadge";
import { NotificationType } from "@/types/notification";
import { INotificationTab } from "./types";

const useUnreadCount = (type: NotificationType) => {
    const { data } = useGetNonViewedNotificationsCountQuery();
    return data?.types[type] || 0;
};

interface TabOptionProps extends TabProps {
    t: INotificationTab;
}

const TabOption: FC<TabOptionProps> = ({ t: { label, type }, ...props }) => {
    const { t } = useTranslation();
    const unread = useUnreadCount(type);
    return (
        <Tab
            label={
                <Box
                    display="flex"
                    alignItems="center"
                    position="relative"
                    gap={1}
                    pr={1}
                >
                    {t(label)}
                    <UnReadBadge count={unread} />
                </Box>
            }
            {...props}
        />
    );
};

const getTabOption = (t: INotificationTab, i: number) => (
    <TabOption key={t.type} t={t} value={i} />
);

export default getTabOption;
