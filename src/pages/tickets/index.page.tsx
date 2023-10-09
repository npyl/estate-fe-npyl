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

import { useGetBoardQuery, useMoveCardMutation } from "src/services/tickets";
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
    const { data: board } = useGetBoardQuery();
    const [moveCard] = useMoveCardMutation();

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
            const destinationColumnId = columnId(destination?.droppableId);

            if (!sourceCardId || !destinationColumnId) return;

            moveCard({ cardId: sourceCardId, columnId: destinationColumnId });
        }
    };

    return (
        <Stack direction={"row"} mt={3} flex={1} gap={3}>
            {items ? (
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
