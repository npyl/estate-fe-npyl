import CircleUnReadNotifications from "@/sections/Notification/_shared/CircleUnReadNotifications";
import { useGetNonViewedNotificationsCountQuery } from "@/services/notification";
import { CircleNotifications } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useMemo } from "react";

const NotificationsIcon = () => {
    const { data: nonViewedNotificationsCount } =
        useGetNonViewedNotificationsCountQuery();

    //  filter out the Contact notifications for now as in the page they are not shown and if there is one i get the unerad badge for something that i can not see at all
    const count = useMemo(() => {
        if (nonViewedNotificationsCount) {
            const { CONTACT, ...rest } = nonViewedNotificationsCount.types;
            return Object.values(rest).reduce((sum, count) => sum + count, 0);
        }
        return 0;
    }, [nonViewedNotificationsCount]);

    return (
        <Box display="flex" justifyContent="space-between">
            <CircleNotifications fontSize="small" />
            {count ? (
                <CircleUnReadNotifications>{count}</CircleUnReadNotifications>
            ) : null}
        </Box>
    );
};

export default NotificationsIcon;
