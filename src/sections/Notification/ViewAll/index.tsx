import {
    Box,
    Stack,
    MenuItem,
    TextField,
    InputAdornment,
    SxProps,
    Theme,
    IconButton,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "@/components/Tabs/TabPanel";
const Listings = dynamic(() => import("./tabs/listings"));
const Tours = dynamic(() => import("./tabs/tours"));
const WorkApplications = dynamic(() => import("./tabs/work"));
const Reviews = dynamic(() => import("./tabs/reviews"));
const Agreements = dynamic(() => import("./tabs/agreements"));
const StayUpdated = dynamic(() => import("./tabs/StayUpdated"));
import dynamic from "next/dynamic";
import { INotificationTab, TViewFilter } from "./types";
import getTabOption from "./getTabOption";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import getBorderColor from "@/theme/borderColor";
import ManagerSelect from "./ManagerSelect";
import Tabs, { useCurrentTab } from "@/components/Tabs";
import Select from "@/components/Select";

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

    const [tab] = useCurrentTab();
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

    const handleClearSearch = () => {
        setSearchText("");
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Tabs>{TABS.map(getTabOption)}</Tabs>

                    <Select
                        value={filter}
                        label={t(`  View `)}
                        formControlProps={{ sx: { minWidth: 120 } }}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">{t(`All`)}</MenuItem>
                        <MenuItem value="viewed">{t(`Viewed`)}</MenuItem>
                        <MenuItem value="notViewed">{t(`Not Viewed`)}</MenuItem>
                    </Select>
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
                                <InputAdornment
                                    position="start"
                                    sx={{ ml: 0.5 }}
                                >
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
                    {tab === 0 && <ManagerSelect />}
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
