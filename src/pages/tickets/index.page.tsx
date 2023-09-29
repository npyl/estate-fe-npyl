// next
import Head from "next/head";
// @mui
import { Container, Stack } from "@mui/material";
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
import { useEffect } from "react";
import { Box } from "@mui/system";

KanbanPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function KanbanPage() {
    const [createBoard, { isSuccess: isBoardCreated }] =
        useCreateBoardMutation();

    const { data: board } = useGetBoardQuery(undefined, {
        skip: !isBoardCreated,
    });

    // TODO: remove; temporary
    useEffect(() => {
        createBoard();
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId, type } = result;

        if (!board) return;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        if (type === "column") {
            const newColumnOrder: string[] = Array.from(board.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            // dispatch(persistColumn(newColumnOrder));
            return;
        }

        const start = board.columns[+source.droppableId];
        const finish = board.columns[+destination.droppableId];

        if (start.id === finish.id) {
            const updatedCardIds = [...start.cardIds];
            updatedCardIds.splice(source.index, 1);
            updatedCardIds.splice(destination.index, 0, draggableId);

            const updatedColumn = {
                ...start,
                cardIds: updatedCardIds,
            };

            // dispatch(
            //     persistCard({
            //         ...board.columns,
            //         [updatedColumn.id]: updatedColumn,
            //     })
            // );
            return;
        }

        const startCardIds = [...start.cardIds];
        startCardIds.splice(source.index, 1);

        const updatedStart = {
            ...start,
            cardIds: startCardIds,
        };

        const finishCardIds = [...finish.cardIds];
        finishCardIds.splice(destination.index, 0, draggableId);

        const updatedFinish = {
            ...finish,
            cardIds: finishCardIds,
        };

        // dispatch(
        //     persistCard({
        //         ...board.columns,
        //         [updatedStart.id]: updatedStart,
        //         [updatedFinish.id]: updatedFinish,
        //     })
        // );
    };

    console.log(board);

    return (
        <>
            <Head>
                <title>Tickets</title>
            </Head>

            <Container maxWidth={"xl"} sx={{ height: 1, mt: 4 }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="column"
                    >
                        {(provided) => (
                            <Stack
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                spacing={3}
                                direction="row"
                                alignItems="flex-start"
                                sx={{
                                    height: 1,
                                    overflowY: "hidden",
                                    ...hideScrollbarX,
                                }}
                            >
                                {!board?.columnOrder?.length ? (
                                    <SkeletonKanbanColumn />
                                ) : (
                                    board?.columnOrder.map(
                                        (columnId, index) => (
                                            <KanbanColumn
                                                index={index}
                                                key={columnId}
                                                column={board.columns[index]}
                                                // cards={board.cards}
                                            />
                                        )
                                    )
                                )}

                                {provided.placeholder}
                                <KanbanColumnAdd />
                            </Stack>
                        )}
                    </Droppable>
                </DragDropContext>
            </Container>
        </>
    );
}
