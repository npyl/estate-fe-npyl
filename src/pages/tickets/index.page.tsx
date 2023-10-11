// @mui
import { Stack } from "@mui/material";
import { DropResult } from "react-beautiful-dnd";
// redux

// utils
import { hideScrollbarX } from "../../utils/cssStyles";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// sections
import { KanbanColumn, KanbanColumnAdd } from "./components";

import {
    useGetBoardQuery,
    useMoveCardMutation,
    useReorderCardMutation,
} from "src/services/tickets";
import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useMemo } from "react";
import { TwoDimentionsDnd } from "src/components/TwoDimentionsDnd";
import { DroppableTypeTask } from "./components/column/KanbanColumn";

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
    const { data: board, isFetching: isBoardFetching } = useGetBoardQuery();
    const [moveCard, { isLoading: isMoveLoading }] = useMoveCardMutation();
    const [reorderCard, { isLoading: isReorderLoading }] =
        useReorderCardMutation();

    const items = useMemo(
        () =>
            board?.columnOrder
                .slice()
                .reverse()
                .map((columnId, index) => {
                    // get column for id
                    const column = board.columns?.find(
                        (c) => c.id === columnId
                    );

                    return column ? (
                        <KanbanColumn key={columnId} column={column} />
                    ) : (
                        <></>
                    );
                }),
        [board?.columnOrder, board?.columns]
    );

    const handleDragEnd = ({
        source,
        destination,
        type,
        draggableId,
    }: DropResult) => {
        console.log(
            "source: ",
            source,
            " destination: ",
            destination,
            " draggableId: ",
            draggableId,
            " type: ",
            type
        );

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
                moveCard({ cardId: sourceCardId, columnId: dstColumnId });
            }
        }
    };

    return (
        <Stack direction={"row"} mt={3} flex={1} gap={3}>
            {!(isMoveLoading || isReorderLoading || isBoardFetching) &&
            items ? (
                <TwoDimentionsDnd
                    items={items || []}
                    columns={3}
                    onDragEnd={handleDragEnd}
                />
            ) : (
                <SkeletonKanbanColumn />
            )}

            <KanbanColumnAdd />
        </Stack>
    );
}
