// @mui
import { Box, Container, Grid } from "@mui/material";
import { DropResult } from "react-beautiful-dnd";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// sections
import { KanbanColumn } from "./components";

import { useMemo } from "react";
import {
    TwoDimentionsDnd,
    parseItemId,
    parseRowId,
} from "src/components/TwoDimentionsDnd/TwoDimentionsDnd";
import {
    DroppableTypeItem,
    TwoDimentionsDndItem,
} from "src/components/TwoDimentionsDnd/types";
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

KanbanPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

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
    const { data: board } = useGetBoardQuery();

    const [moveCard] = useMoveCardMutation();
    const [reorderCard] = useReorderCardMutation();
    const [reorderColumn] = useReorderColumnMutation();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    const COLUMNS = isMobile ? 1 : 3;

    const items: TwoDimentionsDndItem[] = useMemo(
        () =>
            (board?.columnOrder
                .map((columnId) => {
                    // get column for id
                    const column = board.columns?.find(
                        (c) => c.id === columnId
                    );

                    return column
                        ? {
                              id: columnId,
                              value: (
                                  <KanbanColumn
                                      key={columnId}
                                      column={column}
                                  />
                              ),
                          }
                        : null;
                })
                .filter((i) => !!i) as TwoDimentionsDndItem[]) || [], // filter nulls
        [board?.columnOrder, board?.columns]
    );

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
            if (oneDimentionArrayDstIndex === items.length)
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

    const columns = useMemo(() => {
        return isMobile ? 1 : 3;
    }, [isMobile]);

    return (
        <Box position="relative" mt={2}>
            <Container
                maxWidth="xl"
                sx={{
                    mt: 10,
                }}
            >
                {board && items ? (
                    <TwoDimentionsDnd
                        items={items}
                        columns={columns}
                        onDragEnd={handleDragEnd}
                    />
                ) : (
                    <SkeletonKanbanColumn />
                )}
            </Container>

            <KanbanColumnAdd />
        </Box>
    );
}
