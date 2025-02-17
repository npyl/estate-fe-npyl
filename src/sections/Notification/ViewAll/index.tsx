import {
    Box,
    Stack,
    Tabs,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    InputAdornment,
    SxProps,
    Theme,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "src/components/Tabs";
const Listings = dynamic(() => import("./tabs/listings"));
const Tours = dynamic(() => import("./tabs/tours"));
const WorkApplications = dynamic(() => import("./tabs/work"));
const Reviews = dynamic(() => import("./tabs/reviews"));
const Agreements = dynamic(() => import("./tabs/agreements"));
const StayUpdated = dynamic(() => import("./tabs/StayUpdated"));
import dynamic from "next/dynamic";
import { INotificationTab, TViewFilter } from "./types";
import getTabOption from "./getTabOption";
import { FilterFormControl } from "./styled";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";

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

const TABS: INotificationTab[] = [
    { label: "Tours", type: "TOUR" },
    { label: "Listings", type: "LISTING" },
    { label: "Work Applications", type: "WORK_FOR_US" },
    { label: "Reviews", type: "REVIEW" },
    { label: "Agreements", type: "AGREEMENT" },
    { label: "Stay Updated", type: "STAY_UPDATED" },
];

const ViewAllNotifications = () => {
    const { t } = useTranslation();

    const [tab, setTab] = useState(0);
    const [filter, setFilter] = useState<TViewFilter>("all");
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
    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                        {TABS.map(getTabOption)}
                    </Tabs>

                    <FilterFormControl
                        sx={{ minWidth: 120, borderColor: "1px solid red" }}
                    >
                        <InputLabel
                            sx={{
                                fontSize: "medium",
                                color: "primary",
                                display: "flex",
                            }}
                        >
                            {t(`  View `)}
                        </InputLabel>

                        <Select
                            value={filter}
                            label="Filter"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="all">{t(`All`)}</MenuItem>
                            <MenuItem value="viewed">{t(`Viewed`)}</MenuItem>
                            <MenuItem value="notViewed">
                                {t(`Not Viewed`)}
                            </MenuItem>
                        </Select>
                    </FilterFormControl>
                </Stack>
                <Box mt={1} mb={1}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={
                            t(`Search for ${TABS[tab]?.label}`) as string
                        }
                        value={searchText}
                        onChange={handleSearchTextChange}
                        sx={SearchInputSx}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "gray" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
            {/* ------------------------------------------------ */}
            <TabPanel value={tab} index={0}>
                <Tours filter={filter} searchText={debouncedSearchText} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Listings filter={filter} searchText={debouncedSearchText} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <WorkApplications
                    filter={filter}
                    searchText={debouncedSearchText}
                />
            </TabPanel>
            <TabPanel value={tab} index={3}>
                <Reviews filter={filter} searchText={debouncedSearchText} />
            </TabPanel>
            <TabPanel value={tab} index={4}>
                <Agreements filter={filter} searchText={debouncedSearchText} />
            </TabPanel>
            <TabPanel value={tab} index={5}>
                <StayUpdated filter={filter} searchText={debouncedSearchText} />
            </TabPanel>
        </>
    );
};

export default ViewAllNotifications;
