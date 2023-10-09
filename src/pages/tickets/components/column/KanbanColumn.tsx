import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
// @mui
import { Button, Paper, Stack } from "@mui/material";
// @types
import { IKanbanCard, IKanbanCardPOST, IKanbanColumn } from "src/types/kanban";
// components
import Iconify from "../../../../components/iconify";
//
import KanbanTaskAdd from "../KanbanTaskAdd";
import KanbanColumnToolBar from "./KanbanColumnToolBar";
import {
    useAddCardMutation,
    useDeleteCardMutation,
    useDeleteColumnMutation,
    useEditColumnMutation,
} from "src/services/tickets";
import KanbanTaskCard from "../KanbanTaskCard";

// ----------------------------------------------------------------------

type Props = {
    column: IKanbanColumn;
    cards: IKanbanCard[];
    index: number;
};

const DroppableTypeTask = "TASK";

export default function KanbanColumn({ column, cards, index }: Props) {
    // Columns
    const [editColumn] = useEditColumnMutation();
    const [deleteColumn] = useDeleteColumnMutation();

    // Cards
    const [addCard] = useAddCardMutation();
    const [deleteCard] = useDeleteCardMutation();

    const [openAddTask, setOpenAddTask] = useState(false);

    const handleUpdateColumn = async (newName: string) =>
        editColumn({ id: column.id, name: newName });
    const handleDeleteColumn = async () => deleteColumn(column.id);

    const handleToggleAddTask = () => setOpenAddTask(!openAddTask);
    const handleCloseAddTask = () => setOpenAddTask(false);
    const handleDeleteTask = (cardId: number) => deleteCard(cardId);
    const handleAddTask = (task: IKanbanCardPOST) =>
        addCard({ ...task, columnId: column.id }).then(() =>
            handleCloseAddTask()
        );

    // NOTE: backend doesn't delete columnOrder when a column is deleted!
    if (!column) return null;

    return (
        <Droppable droppableId={column.id.toString()} type={DroppableTypeTask}>
            {(provided) => (
                <Paper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    variant="outlined"
                    sx={{
                        px: 2,
                        borderRadius: 1,
                        borderStyle: "dashed",
                        bgcolor: (theme) =>
                            theme.palette.mode === "light"
                                ? "grey.100"
                                : "background.default",
                    }}
                >
                    <Stack spacing={3}>
                        <KanbanColumnToolBar
                            columnName={column.name}
                            onDelete={handleDeleteColumn}
                            onUpdate={handleUpdateColumn}
                        />

                        <Stack spacing={2} sx={{ width: 280 }}>
                            {column.cardOrder.map((cardId, index) => {
                                const card = cards.find((c) => c.id === cardId);

                                return card ? (
                                    <Draggable
                                        draggableId={column.id.toString()}
                                        index={index}
                                        key={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                <KanbanTaskCard
                                                    key={cardId}
                                                    index={index}
                                                    onDeleteTask={
                                                        handleDeleteTask
                                                    }
                                                    card={card}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ) : (
                                    <></>
                                );
                            })}
                        </Stack>

                        <Stack spacing={2} sx={{ pb: 3 }}>
                            {openAddTask && (
                                <KanbanTaskAdd
                                    onAddTask={handleAddTask}
                                    onCloseAddTask={handleCloseAddTask}
                                />
                            )}

                            <Button
                                fullWidth
                                size="large"
                                color="inherit"
                                startIcon={
                                    <Iconify icon="eva:plus-fill" mb={2} />
                                }
                                onClick={handleToggleAddTask}
                                sx={{ fontSize: 14 }}
                            >
                                Add Task
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            )}
        </Droppable>
    );
}
