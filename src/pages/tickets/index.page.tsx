// next
import Head from "next/head";
// @mui
import { Box } from "@mui/material";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
// redux

// utils
import { hideScrollbarX } from "../../utils/cssStyles";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// sections
import { KanbanColumn, KanbanColumnAdd } from "./components";

import { useGetBoardQuery, useCreateBoardMutation } from "src/services/tickets";
import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useEffect, useMemo } from "react";
import { TwoDimentionsDnd } from "src/components/TwoDimentionsDnd";

KanbanPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function KanbanPage() {
    const [createBoard, { isSuccess: isBoardCreated }] =
        useCreateBoardMutation();

    const { data: board } = useGetBoardQuery();

    const items = useMemo(
        () =>
            board?.columnOrder
                .slice()
                .reverse()
                .map((columnId, index) => {
                    // get column for id
                    const column = board.columns.find((c) => c.id === columnId);

                    return column ? (
                        <KanbanColumn
                            index={index}
                            key={columnId}
                            column={column}
                            cards={board.cards}
                        />
                    ) : (
                        <></>
                    );
                }),
        [board?.columnOrder, board?.columns]
    );

    const handleDragEnd = () => {};

    return (
        <Box mt={3}>
            <TwoDimentionsDnd
                items={items || []}
                columns={4}
                onDragEnd={handleDragEnd}
            />
        </Box>
    );
}
