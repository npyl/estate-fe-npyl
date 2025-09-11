import {
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { FC, useCallback } from "react";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { format, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { THistoryItem } from "./types";
import useSearchHistory from "./useSearchHistory";

const formatHistoryDate = (dateString: string) => {
    const date = parseISO(dateString);

    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isThisWeek(date)) return format(date, "EEEE"); // Show day of the week (e.g. "Monday")

    return format(date, "dd MMM yyyy"); // Default format for older dates (e.g. "12 Feb 2025")
};

interface HistoryItemProps extends THistoryItem {
    onSelect: (s: string) => void;
}

const HistoryItem: FC<HistoryItemProps> = ({ term, date, onSelect }) => {
    const { t } = useTranslation();

    const { setSearchHistory } = useSearchHistory();

    const handleDeleteHistoryItem = useCallback(
        (searchTerm: string, event: any) => {
            event.stopPropagation();
            setSearchHistory((old) =>
                old.filter(({ term }) => term !== searchTerm)
            );
        },
        [setSearchHistory]
    );

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => onSelect(term)}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Stack direction="row" gap={2} alignItems="center">
                        <HistoryOutlinedIcon
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === "light"
                                        ? theme.palette.neutral?.[700] ||
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
                                        theme.palette.mode === "light"
                                            ? theme.palette.neutral?.[700] ||
                                              theme.palette.grey[700]
                                            : "white",
                                    flexDirection: "row",
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center">
                        {date && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.mode === "light"
                                            ? theme.palette.grey[700]
                                            : "white",
                                }}
                            >
                                {t(formatHistoryDate(date))}
                            </Typography>
                        )}

                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => handleDeleteHistoryItem(term, e)}
                            sx={{
                                borderRadius: "100%",
                                paddingInline: "3px",
                                py: "0.5px",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    borderRadius: "100%",
                                },
                                mr: 0.5,
                            }}
                        >
                            <ClearOutlinedIcon sx={{ width: "16px" }} />
                        </IconButton>
                    </Stack>
                </Stack>
            </ListItemButton>
        </ListItem>
    );
};

const getItem = (onSelect: (s: string) => void) => (props: THistoryItem) => (
    <HistoryItem key={props.date} {...props} onSelect={onSelect} />
);

export default getItem;
