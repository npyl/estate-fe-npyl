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
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    borderRadius: theme.spacing(1),
    borderStyle: "dashed",

    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey?.[100]
            : theme.palette.background.default,

    minWidth: "min-content",
}));

// ----------------------------------------------------------------------

type Props = {
    column: IKanbanColumn;
};

export const DroppableTypeTask = "TASK";

export default function KanbanColumn({ column }: Props) {
    const { t } = useTranslation();

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

    // NOTE: backend doesn't delete columnOrder when a column is deleted!
    if (!column) return null;

    return (
        <Droppable
            droppableId={`section-${column.id}`}
            type={DroppableTypeTask}
        >
            {(provided) => (
                <StyledPaper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    variant="outlined"
                >
                    <Stack spacing={3} position="relative">
                        <KanbanColumnToolBar
                            columnName={column.name}
                            onDelete={handleDeleteColumn}
                            onUpdate={handleUpdateColumn}
                        />

                        <Stack
                            spacing={2}
                            // NOTE: a minimum height helps a dropped card not fall on the column name glitch
                            minHeight={150}
                        >
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
                </StyledPaper>
            )}
        </Droppable>
    );
}
