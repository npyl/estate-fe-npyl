// @mui
import { Box, Container, Stack } from "@mui/material";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// sections
import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useGetBoardQuery } from "src/services/tickets";
import KanbanColumnAdd from "./components/column/KanbanColumnAdd";
import Board from "./Board";

export default function KanbanPage() {
    const { data: board, isLoading } = useGetBoardQuery();

    return (
        <Box position="relative" mt={2}>
            <Container
                maxWidth="xl"
                sx={{
                    mt: 1,
                    mb: 3,
                }}
            >
                <Stack direction={"row"} justifyContent={"flex-end"}>
                    <KanbanColumnAdd
                        color="info"
                        sx={{
                            mb: 2,
                            width: "35px",
                            height: "35px",
                            zIndex: 1,
                        }}
                    />
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
