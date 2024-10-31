import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
// @mui
import { Button } from "@mui/material";
// @types
import { IKanbanCardPOST, IKanbanColumn } from "src/types/kanban";
// components
import Iconify from "src/components/iconify";
//
import {
    useAddCardMutation,
    useDeleteColumnMutation,
} from "src/services/tickets";
import KanbanTaskAdd from "../KanbanTaskAdd";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import Cards from "./Cards";
import { StyledPaper } from "./styled";

// useEditColumnMutation,

// ----------------------------------------------------------------------

type Props = {
    id: number; // INFO: Necessary for TwoDimentionsDnd!
    column: IKanbanColumn;
};

export const DroppableTypeTask = "TASK";

export default function Column({ column }: Props) {
    const { t } = useTranslation();

    // Columns
    // const [editColumn] = useEditColumnMutation();
    const [deleteColumn] = useDeleteColumnMutation();

    // Cards
    const [addCard] = useAddCardMutation();

    const [openAddTask, setOpenAddTask] = useState(false);

    // const handleUpdateColumn = async (name: string) =>
    //     editColumn({ id: column.id, name });
    const handleDeleteColumn = async () => deleteColumn(column.id);

    const handleToggleAddTask = () => setOpenAddTask(!openAddTask);
    const handleCloseAddTask = () => setOpenAddTask(false);
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
                    <Header name={column.name} count={column.cardIds.length} />

                    <Cards mt={2} spacing={2} ids={column.cardOrder} />

                    {provided.placeholder}

                    {/* Add Task button */}
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
                            sx={{
                                mt: 2,
                                fontSize: "12px",
                            }}
                        >
                            {t("Add Task")}
                        </Button>
                    ) : null}
                </StyledPaper>
            )}
        </Droppable>
    );
}
