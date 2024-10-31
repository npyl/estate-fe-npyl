import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// @mui
import {
    Avatar,
    Box,
    Checkbox,
    Dialog,
    DialogContent,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
// @types
import { IKanbanCard } from "src/types/kanban";
// components
import Iconify from "src/components/iconify";
import Image from "src/components/image";
//
import KanbanDetails from "./details/KanbanDetails";
import {
    useEditCardMutation,
    useGetBoardQuery,
    useMoveCardMutation,
} from "src/services/tickets";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

// ----------------------------------------------------------------------

type Props = {
    index: number;
    card: IKanbanCard;
    onDeleteTask: (id: number) => void;
};

export default function KanbanTaskCard({ card, onDeleteTask, index }: Props) {
    const { id, name, attachments, completed, priority, user } = card || {};

    const theme = useTheme();
    const [editCard] = useEditCardMutation();
    const { data: board } = useGetBoardQuery();
    const [moveCard] = useMoveCardMutation();
    const { t } = useTranslation();
    const [openDetails, setOpenDetails] = useState(false);

    // Stop event propagation to prevent the task details modal from opening
    const handleOpenDetails = () => {
        if (!openDetails) {
            setOpenDetails(true);
        }
    };

    const handleCloseDetails = () => setOpenDetails(false);

    const handleChangeComplete = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.stopPropagation(); // checkbox click doesn't trigger modal open

        const doneColumn = board?.columns.find((col) => col.id === 155);
        const inProgressColumn = board?.columns.find((col) => col.id === 154);

        if (!doneColumn || !inProgressColumn) return;

        try {
            await editCard({
                id,
                name,
                attachments,
                priority,
                completed: !completed,
                userIds: user.map((u) => u.id),
            });

            // Move the card based on the completed state
            if (!completed) {
                await moveCard({
                    cardId: id,
                    srcColumnId: card.id,
                    dstColumnId: doneColumn.id,
                });
            } else {
                await moveCard({
                    cardId: id,
                    srcColumnId: card.id,
                    dstColumnId: inProgressColumn.id,
                });
            }
            console.log(`after: ${card.completed}`);
        } catch (error) {
            console.error("Error moving card:", error);
        }
    };

    const [openModal, setOpenModal] = useState(false);
    const [currentImage, setCurrentImage] = useState("");

    const handleOpenModal = (image: string) => {
        setCurrentImage(image);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentImage("");
    };

    if (!card) return null;

    return (
        <>
            <Draggable
                draggableId={`task-${card.id}`}
                key={`task-${card.id}`}
                index={index}
            >
                {(provided) => (
                    <Paper
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        sx={{
                            width: "100%",
                            borderRadius: "8.5px",
                            p: 1.5,
                            border: "3px solid transparent",
                            boxShadow:
                                "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
                            "&:hover": {
                                boxShadow:
                                    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
                                backgroundColor: "#d0e7ff",
                                border: "3px solid #3399ff",
                                p: 1.5,
                            },
                            display: "flex",
                            flexDirection: "row",
                            cursor: "pointer",
                            position: "relative", // Allows absolute positioning of child elements
                        }}
                        onClick={handleOpenDetails}
                    >
                        {/* Priority Icon - Top Right Corner */}
                        {(priority === 2 || priority === 1) && !completed && (
                            <Box
                                sx={{ position: "absolute", top: 8, right: 8 }}
                            >
                                {priority === 2 && (
                                    <Tooltip
                                        placement="top"
                                        title="High priority task"
                                    >
                                        <div>
                                            <Iconify
                                                icon="eva:alert-triangle-outline"
                                                sx={{
                                                    color: "red",
                                                    fontSize: "20px",
                                                }}
                                            />
                                        </div>
                                    </Tooltip>
                                )}
                                {priority === 1 && (
                                    <Tooltip
                                        placement="top"
                                        title="Medium priority task"
                                    >
                                        <div>
                                            <Iconify
                                                icon="eva:alert-triangle-outline"
                                                sx={{
                                                    color: "orange",
                                                    fontSize: "20px",
                                                }}
                                            />
                                        </div>
                                    </Tooltip>
                                )}
                            </Box>
                        )}

                        <Stack spacing={1}>
                            <Stack direction="row" alignItems="center">
                                <Checkbox
                                    disableRipple
                                    checked={completed}
                                    icon={
                                        <Iconify icon="eva:radio-button-off-outline" />
                                    }
                                    checkedIcon={
                                        <Iconify icon="eva:checkmark-circle-2-outline" />
                                    }
                                    onClick={(event) => event.stopPropagation()} // Prevent modal from opening
                                    onChange={handleChangeComplete}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        minHeight: 37,
                                        mt: 1,
                                        lineHeight: "16px",
                                        fontSize: "13px",
                                        maxWidth: "400px",
                                        fontWeight: "600",
                                        overflow: "auto",
                                        transition: (theme) =>
                                            theme.transitions.create(
                                                "opacity",
                                                {
                                                    duration:
                                                        theme.transitions
                                                            .duration.shortest,
                                                }
                                            ),
                                        ...(completed && { opacity: 0.48 }),
                                    }}
                                >
                                    {name}
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" mt={1}>
                                <ConfirmationNumberOutlinedIcon
                                    sx={{
                                        fontSize: "16px",
                                        color: "#4CAF50",
                                        ml: 0,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ml: 0.6,
                                        fontWeight: 500,
                                        color: "#666",
                                    }}
                                >
                                    {`ticket-${id}`}{" "}
                                </Typography>
                            </Stack>

                            {/* Assigned to emails - Bottom Right Corner */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 8,
                                    right: 8,
                                    textAlign: "right",
                                }}
                            >
                                {user?.length > 0 && (
                                    <Stack
                                        direction="column"
                                        alignItems="flex-end"
                                    >
                                        <Typography
                                            fontSize={"10.5px"}
                                            fontWeight={600}
                                            color="text.secondary"
                                            alignSelf="center"
                                        >
                                            {t("Assigned to")}
                                        </Typography>
                                        {user?.map((u, index) => (
                                            <Typography
                                                key={index}
                                                fontSize={"10.5px"}
                                                sx={{
                                                    wordWrap: "break-word",
                                                }}
                                            >
                                                {u.email}
                                            </Typography>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Stack>
                    </Paper>
                )}
            </Draggable>

            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                PaperProps={{
                    sx: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
            >
                <DialogContent dividers>
                    <img
                        src={currentImage}
                        alt="Attachment"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </DialogContent>
            </Dialog>

            <KanbanDetails
                task={card}
                openDetails={openDetails}
                onCloseDetails={handleCloseDetails}
                onDeleteTask={() => onDeleteTask(card.id)}
            />
        </>
    );
}
