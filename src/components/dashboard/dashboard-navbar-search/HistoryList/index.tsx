import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
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

interface HistoryListProps {
    onSelect: (s: string) => void;
}

export interface HistoryListRef {
    setSearchHistory: Dispatch<SetStateAction<string[]>>;
}

const HistoryList = forwardRef<HistoryListRef, HistoryListProps>(
    ({ onSelect }, ref) => {
        // search history states
        const [searchHistory, setSearchHistory] = useState<string[]>(
            getSearchHistory()
        );

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
                {searchHistory?.map((historyItem, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => onSelect(historyItem)}>
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
                                                      theme.palette.grey[700] // Fallback to grey if neutral is undefined
                                                    : "white",
                                            width: "16px",
                                        }}
                                    />
                                    <ListItemText
                                        primary={historyItem}
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? theme.palette
                                                          .neutral?.[700] ||
                                                      theme.palette.grey[700] // Fallback to grey if neutral is undefined
                                                    : "white",
                                        }}
                                    />
                                </Stack>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={(e) =>
                                        handleDeleteHistoryItem(historyItem, e)
                                    }
                                    sx={{
                                        borderRadius: "100%",
                                        padding: "3px",

                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.1)",
                                            borderRadius: "100%",

                                            padding: "3px",
                                        },
                                        mr: 0.5,
                                    }}
                                >
                                    <ClearOutlinedIcon
                                        sx={{
                                            width: "16px",
                                        }}
                                    />
                                </IconButton>
                            </Stack>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        );
    }
);

export default HistoryList;
