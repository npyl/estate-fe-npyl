// @mui
import {
    Avatar,
    Box,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// sections
import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useGetBoardQuery } from "src/services/tickets";
import KanbanColumnAdd from "./components/column/KanbanColumnAdd";
import Board from "./Board";
import { useAllUsersQuery } from "@/services/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "@mui/icons-material";

export default function KanbanPage() {
    const { t } = useTranslation();

    const { data: board, isLoading } = useGetBoardQuery();
    const { data: users } = useAllUsersQuery();
    console.log(users);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // State to hold the selected user ID
    const [searchQuery, setSearchQuery] = useState<string>("");
    // Handle user selection from dropdown
    const handleUserChange = (event: SelectChangeEvent<number>) => {
        setSelectedUserId(
            event.target.value ? parseInt(event.target.value as string) : null
        );
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // function to convert image
    const getProfileImageSrc = (base64String: string | null) => {
        return base64String
            ? `data:image/jpeg;base64,${base64String}`
            : "/static/images/avatar_default.jpg";
    };

    return (
        <Box position="relative" mt={2}>
            <Container
                maxWidth="xl"
                sx={{
                    mt: 1,
                    mb: 3,
                }}
            >
                {/* User Select Dropdown */}
                <Stack
                    direction="row"
                    spacing={2}
                    mb={3}
                    justifyContent="flex-start"
                >
                    <TextField
                        placeholder={t("Search Tickets") || ""}
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ width: 200 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="user-select-label">
                            {t("Assigned to")}
                        </InputLabel>
                        <Select
                            labelId="user-select-label"
                            value={selectedUserId || ""}
                            label="Filter by User"
                            onChange={handleUserChange}
                        >
                            <MenuItem value="">
                                <Typography>{t("All Users")}</Typography>
                            </MenuItem>
                            {users?.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        gap={1}
                                    >
                                        <Avatar
                                            src={getProfileImageSrc(
                                                user.profilePhoto
                                            )}
                                            alt={user.firstName}
                                            sx={{ width: 22, height: 22 }}
                                        />
                                        {user.firstName} {user.lastName}
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                {board ? <Board board={board} /> : null}

                {isLoading ? <SkeletonKanbanColumn /> : null}
            </Container>
        </Box>
    );
}

// ----------------------------------------------------

KanbanPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);
