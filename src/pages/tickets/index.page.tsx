// @mui
import { Box, Container, Stack } from "@mui/material";
import { DropResult } from "react-beautiful-dnd";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// sections
import { KanbanColumn } from "./components";

import { Children, useMemo } from "react";
import { TwoDimentionsDnd } from "src/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { DroppableTypeItem } from "src/components/TwoDimentionsDnd/types";
import { SkeletonKanbanColumn } from "src/components/skeleton";
import {
    useGetBoardQuery,
    useMoveCardMutation,
    useReorderCardMutation,
    useReorderColumnMutation,
} from "src/services/tickets";
import { DroppableTypeTask } from "./components/column/KanbanColumn";
import KanbanColumnAdd from "./components/column/KanbanColumnAdd";
import { useMediaQuery, useTheme } from "@mui/material";
import { parseItemId, parseRowId } from "@/components/TwoDimentionsDnd/util";

// ----------------------------------------------------------------------
// Λεξιλόγιο που χρησιμοποιείται (Αντιστοιχίες)
// task = card
// section = IKanbanColumn = item
// ----------------------------------------------------------------------

const cardId = (str?: string) => {
    if (!str) return null;
    const match = str.match(/task-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};
const columnId = (str?: string) => {
    if (!str) return null;
    const match = str.match(/section-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};

export default function KanbanPage() {
    const { data: board, isLoading } = useGetBoardQuery();

    const [moveCard] = useMoveCardMutation();
    const [reorderCard] = useReorderCardMutation();
    const [reorderColumn] = useReorderColumnMutation();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    const COLUMNS = isMobile ? 1 : 4;

    const items = useMemo(
        () =>
            board?.columnOrder.map((columnId) => {
                // get column for id
                const column = board.columns?.find((c) => c.id === columnId);

                if (column)
                    return (
                        <KanbanColumn
                            id={columnId}
                            key={columnId}
                            column={column}
                        />
                    );

                return null;
            }),
        [board?.columnOrder, board?.columns]
    );

    const itemsLength = useMemo(() => Children.count(items), [items]);

    const handleDragEnd = ({
        source,
        destination,
        type,
        draggableId,
    }: DropResult) => {
        if (type === DroppableTypeItem) {
            const { itemId: draggedItemId } = parseItemId(draggableId);
            const { rowId: dstRow } = parseRowId(destination?.droppableId);
            const dstCol = destination?.index;

            if (
                draggedItemId === -1 ||
                dstRow === -1 ||
                dstCol === null ||
                dstCol === undefined
            )
                return;

            let oneDimentionArrayDstIndex = dstRow * COLUMNS + dstCol;

            /* NOTE: compensate for when user moves a section at the end of the board */
            if (oneDimentionArrayDstIndex === itemsLength)
                oneDimentionArrayDstIndex -= 1;

            reorderColumn({
                columnId: draggedItemId,
                position: oneDimentionArrayDstIndex,
            });
        }

        if (type === DroppableTypeTask) {
            const sourceCardId = cardId(draggableId);
            const srcColumnId = columnId(source?.droppableId);
            const dstColumnId = columnId(destination?.droppableId);

            if (
                sourceCardId === null ||
                dstColumnId === null ||
                srcColumnId === null
            )
                return;

            if (srcColumnId === dstColumnId) {
                const newIndex = destination?.index;
                if (newIndex === null || newIndex === undefined) return;

                // reorder inside same column
                reorderCard({
                    cardId: sourceCardId,
                    position: newIndex,
                    columnId: dstColumnId,
                });
            } else {
                // move to different column
                moveCard({ cardId: sourceCardId, srcColumnId, dstColumnId });
            }
        }
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
                <Stack direction={"row"} justifyContent={"flex-end"}>
                    <KanbanColumnAdd
                        sx={{
                            mb: 2,
                            width: "35px",
                            height: "35px",
                        }}
                    />
                </Stack>
                {board && items ? (
                    <TwoDimentionsDnd
                        columns={COLUMNS}
                        onDragEnd={handleDragEnd}
                        draggableSx={{ justifyContent: "flex-start" }}
                    >
                        {items}
                    </TwoDimentionsDnd>
                ) : null}

                {isLoading ? <SkeletonKanbanColumn /> : null}
            </Container>
        </Box>
    );
}

// ----------------------------------------------------

KanbanPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);
