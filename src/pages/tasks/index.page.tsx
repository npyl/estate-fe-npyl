// @mui
import { Box, Container } from "@mui/material";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// sections
import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useGetBoardQuery } from "src/services/tickets";
import dynamic from "next/dynamic";
const Board = dynamic(() => import("./Board"));
import Bar from "./Bar";

export default function KanbanPage() {
    const { data: board, isLoading } = useGetBoardQuery();

    return (
        <Box position="relative" mt={2}>
            <Bar />

            <Container
                maxWidth="xl"
                sx={{
                    mt: 1,
                    mb: 3,
                }}
            >
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
