import { Box } from "@mui/material";
import CircleUnReadNotifications from "@/pages/notification/components/CircleUnReadNotifications";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useArchivedCountQuery } from "@/services/properties";
import CounterSkeleton from "./CounterSkeleton";

const ArchivedIcon = () => {
    const { data, isLoading } = useArchivedCountQuery();

    return (
        <Box display="flex" justifyContent="space-between">
            <ArchiveIcon fontSize="small" />

            {isLoading ? <CounterSkeleton /> : null}

            {data ? (
                <CircleUnReadNotifications>{data}</CircleUnReadNotifications>
            ) : null}
        </Box>
    );
};

export default ArchivedIcon;
