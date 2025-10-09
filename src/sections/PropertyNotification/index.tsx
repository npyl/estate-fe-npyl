import { Box, Stack, MenuItem, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFilterNotificationsQuery } from "@/services/notification";
import { NotificationType } from "@/types/notification";
import Table from "../Notification/ViewAll/table";
import Select from "@/components/Select";
import PoppingSearch from "@/components/PoppingSearch";

interface PropertyNotificationProps {
    propertyId: string | string[] | undefined;
}

const PropertyNotification: React.FC<PropertyNotificationProps> = ({
    propertyId,
}) => {
    const { t } = useTranslation();

    const [filter, setFilter] = useState<string>("all");
    const [searchText, setSearchText] = useState("");

    const handleFilterChange = (event: any) => {
        setFilter(event.target.value);
    };

    const onClear = () => setSearchText("");

    const filterBody = useMemo(() => {
        return {
            fromDate: null,
            toDate: null,
            search: searchText || "",
            types: ["TOUR"] as NotificationType[],
            property: propertyId ? Number(propertyId) : undefined,
            viewed:
                filter === "viewed"
                    ? true
                    : filter === "notViewed"
                      ? false
                      : undefined,
        };
    }, [filter, searchText, propertyId]);

    const { data: notifications } = useFilterNotificationsQuery({
        filter: filterBody,
        page: 0,
        pageSize: 10,
        sortBy: "createdAt",
        direction: "DESC",
    });

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            {/* {notifications?.content?.length ? ( */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <PoppingSearch
                    value={searchText}
                    onChange={setSearchText}
                    onClear={onClear}
                />

                <Select
                    label={t(`  View `)}
                    value={filter}
                    onChange={handleFilterChange}
                    displayEmpty
                    formControlProps={{ sx: { minWidth: 140 } }}
                >
                    <MenuItem value="all">{t("All")}</MenuItem>
                    <MenuItem value="viewed">{t("Viewed")}</MenuItem>
                    <MenuItem value="notViewed">{t("Not Viewed")}</MenuItem>
                </Select>
            </Stack>

            {notifications?.content?.length ? (
                <Table
                    variant="TOUR"
                    rows={notifications?.content || []}
                    filter={t("View")}
                    totalRows={notifications?.totalElements || 0}
                    hidePagination={true}
                />
            ) : (
                <Typography color="textSecondary" variant="body2" mt={1}>
                    {t("No tour notifications available for this property.")}
                </Typography>
            )}
        </Box>
    );
};

export default PropertyNotification;
