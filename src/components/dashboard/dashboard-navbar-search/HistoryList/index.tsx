import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import {
    Dispatch,
    forwardRef,
    SetStateAction,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { getSearchHistory, removeSearchHistoryItem } from "./history";
import { format, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";

const formatHistoryDate = (dateString: string) => {
    const date = parseISO(dateString);

    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isThisWeek(date)) return format(date, "EEEE"); // Show day of the week (e.g. "Monday")

    return format(date, "dd MMM yyyy"); // Default format for older dates (e.g. "12 Feb 2025")
};

interface HistoryListProps {
    onSelect: (s: string) => void;
}

export interface HistoryListRef {
    setSearchHistory: Dispatch<
        SetStateAction<{ term: string; date: string }[]>
    >;
}

const HistoryList = forwardRef<HistoryListRef, HistoryListProps>(
    ({ onSelect }, ref) => {
        const { t } = useTranslation();

        // State for search history
        const [searchHistory, setSearchHistory] = useState<
            { term: string; date: string }[]
        >(getSearchHistory());

        useImperativeHandle(
            ref,
            () => ({
                setSearchHistory,
            }),
            []
        );

        const handleDeleteHistoryItem = useCallback(
            (searchTerm: string, event: any) => {
                event.stopPropagation();
                const updatedHistory = removeSearchHistoryItem(searchTerm);
                setSearchHistory(updatedHistory);
            },
            []
        );

        return (
            <List
                sx={{
                    position: "absolute",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light" ? "white" : "#001830",
                    boxShadow: 1,
                    width: { xs: "65vw", sm: "40vw" },
                    zIndex: 1500, // Ensure it appears above other elements
                    top: "50px", // Position below the input field
                }}
            >
                {searchHistory?.map(({ term, date }, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => onSelect(term)}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                width="100%"
                            >
                                <Stack
                                    direction="row"
                                    gap={2}
                                    alignItems="center"
                                >
                                    <HistoryOutlinedIcon
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? theme.palette
                                                          .neutral?.[700] ||
                                                      theme.palette.grey[700]
                                                    : "white",
                                            width: "16px",
                                        }}
                                    />
                                    <Stack>
                                        <ListItemText
                                            primary={term}
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.mode ===
                                                    "light"
                                                        ? theme.palette
                                                              .neutral?.[700] ||
                                                          theme.palette
                                                              .grey[700]
                                                        : "white",
                                                flexDirection: "row",
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack
                                    direction="row"
                                    gap={2}
                                    alignItems="center"
                                >
                                    {date && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.mode ===
                                                    "light"
                                                        ? theme.palette
                                                              .grey[700]
                                                        : "white",
                                            }}
                                        >
                                            {t(formatHistoryDate(date))}
                                        </Typography>
                                    )}

                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={(e) =>
                                            handleDeleteHistoryItem(term, e)
                                        }
                                        sx={{
                                            borderRadius: "100%",
                                            paddingInline: "3px",
                                            py: "0.5px",
                                            "&:hover": {
                                                backgroundColor:
                                                    "rgba(0, 0, 0, 0.1)",
                                                borderRadius: "100%",
                                            },
                                            mr: 0.5,
                                        }}
                                    >
                                        <ClearOutlinedIcon
                                            sx={{ width: "16px" }}
                                        />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        );
    }
);

export default HistoryList;
