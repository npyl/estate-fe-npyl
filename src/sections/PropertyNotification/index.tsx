import {
    Box,
    Stack,
    MenuItem,
    TextField,
    InputAdornment,
    SxProps,
    Theme,
    IconButton,
    Typography,
} from "@mui/material";
import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
    useDeleteNotificationMutation,
    useFilterNotificationsQuery,
} from "@/services/notification";
import { NotificationType } from "@/types/notification";
import getBorderColor from "@/theme/borderColor";
import Table from "../Notification/ViewAll/table";
import Select from "@/components/Select";

// 🔹 Search Input Styling
const SearchInputSx: SxProps<Theme> = {
    minWidth: 350,
    "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
        backgroundColor: "white",
        "&.Mui-focused": {
            borderColor: "primary.main",
        },
        "&:hover": {
            borderColor: "primary.light",
        },
    },
};

// 🔹 Clear Button Styling
const ClearButtonSx: SxProps<Theme> = {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: "1px solid",
    borderColor: getBorderColor,
    "& svg": {
        fontSize: "1.1rem",
        transform: "scale(0.8)",
    },
};

interface PropertyNotificationProps {
    propertyId: string | string[] | undefined;
}

const PropertyNotification: React.FC<PropertyNotificationProps> = ({
    propertyId,
}) => {
    const { t } = useTranslation();

    const [filter, setFilter] = useState<string>("all");
    const [searchText, setSearchText] = useState("");

    const [debouncedSearchText] = useDebounce(searchText, 400);

    const handleFilterChange = (event: any) => {
        setFilter(event.target.value);
    };

    const handleSearchTextChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
        },
        []
    );

    const handleClearSearch = () => {
        setSearchText("");
    };
    const filterBody = useMemo(() => {
        return {
            fromDate: null,
            toDate: null,
            search: debouncedSearchText || "",
            types: ["TOUR"] as NotificationType[],
            property: propertyId ? Number(propertyId) : undefined,
            viewed:
                filter === "viewed"
                    ? true
                    : filter === "notViewed"
                      ? false
                      : undefined,
        };
    }, [filter, debouncedSearchText, propertyId]);

    const { data: notifications, isLoading } = useFilterNotificationsQuery({
        filter: filterBody,
        page: 0,
        pageSize: 10,
        sortBy: "createdAt",
        direction: "DESC",
    });

    const [deleteNotification] = useDeleteNotificationMutation();
    const handleRemove = (id: number) => {
        deleteNotification(id);
    };
    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            {/* {notifications?.content?.length ? ( */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder={t("Search for tours") as string}
                    value={searchText}
                    onChange={handleSearchTextChange}
                    sx={SearchInputSx}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" sx={{ ml: 0.5 }}>
                                <SearchIcon sx={{ color: "gray" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                mr={0.5}
                            >
                                {searchText ? (
                                    <IconButton
                                        onClick={handleClearSearch}
                                        sx={ClearButtonSx}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                ) : null}
                            </Stack>
                        ),
                    }}
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
                    loading={isLoading}
                    filter={t("View")}
                    totalRows={notifications?.totalElements || 0}
                    hidePagination={true}
                    onRemove={handleRemove}
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
