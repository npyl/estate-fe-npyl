import { useMemo, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
// @mui
import { Box, Button, Paper, Stack } from "@mui/material";
// @types
import { IKanbanCardPOST, IKanbanColumn } from "src/types/kanban";
// components
import Iconify from "src/components/iconify";
//
import {
    useAddCardMutation,
    useDeleteCardMutation,
    useDeleteColumnMutation,
    useEditColumnMutation,
    useGetBoardQuery,
} from "src/services/tickets";
import KanbanTaskAdd from "../KanbanTaskAdd";
import KanbanTaskCard from "../KanbanTaskCard";
import KanbanColumnToolBar from "./KanbanColumnToolBar";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
    column: IKanbanColumn;
};

export const DroppableTypeTask = "TASK";

export default function KanbanColumn({ column }: Props) {
    const { data: board } = useGetBoardQuery();
    const cards = useMemo(() => board?.cards || [], [board]);

    // Columns
    const [editColumn] = useEditColumnMutation();
    const [deleteColumn] = useDeleteColumnMutation();

    // Cards
    const [addCard] = useAddCardMutation();
    const [deleteCard] = useDeleteCardMutation();

    const [openAddTask, setOpenAddTask] = useState(false);

    const handleUpdateColumn = async (name: string) =>
        editColumn({ id: column.id, name });
    const handleDeleteColumn = async () => deleteColumn(column.id);

    const handleToggleAddTask = () => setOpenAddTask(!openAddTask);
    const handleCloseAddTask = () => setOpenAddTask(false);
    const handleDeleteTask = (cardId: number) => deleteCard(cardId);
    const handleAddTask = (task: IKanbanCardPOST) =>
        addCard({ ...task, columnId: column.id }).then(() =>
            handleCloseAddTask()
        );

    const { t } = useTranslation();
    // NOTE: backend doesn't delete columnOrder when a column is deleted!
    if (!column) return null;

    return (
        <Droppable
            droppableId={`section-${column.id}`}
            type={DroppableTypeTask}
        >
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
                    <Stack spacing={3} position="relative">
                        <KanbanColumnToolBar
                            columnName={column.name}
                            onDelete={handleDeleteColumn}
                            onUpdate={handleUpdateColumn}
                        />

                        <Stack spacing={2} sx={{ width: 280 }}>
                            {column.cardOrder.map((cardId, index) => {
                                const card = cards?.find(
                                    (c) => c.id === cardId
                                );

                                return card ? (
                                    <KanbanTaskCard
                                        key={index}
                                        index={index}
                                        onDeleteTask={handleDeleteTask}
                                        card={card}
                                    />
                                ) : null;
                            })}
                        </Stack>
                    </Stack>

                    {provided.placeholder}

                    {/* Add Task button */}
                    <Box my={3}>
                        {openAddTask ? (
                            <KanbanTaskAdd
                                onAddTask={handleAddTask}
                                onCloseAddTask={handleCloseAddTask}
                            />
                        ) : null}

                        {!openAddTask ? (
                            <Button
                                fullWidth
                                size="large"
                                color="inherit"
                                startIcon={
                                    <Iconify icon="eva:plus-fill" mb={1.5} />
                                }
                                onClick={handleToggleAddTask}
                            >
                                {t("Add Task")}
                            </Button>
                        ) : null}
                    </Box>
                </Paper>
            )}
        </Droppable>
    );
}
