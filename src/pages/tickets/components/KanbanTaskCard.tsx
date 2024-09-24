import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
// @mui
import {
    Box,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
// @types
import { IKanbanCard } from "src/types/kanban";
// components
import Iconify from "src/components/iconify";
import Image from "src/components/image";
//
import KanbanDetails from "./details/KanbanDetails";
import { useEditCardMutation } from "src/services/tickets";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
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
    const { t } = useTranslation();
    const [openDetails, setOpenDetails] = useState(false);
    const handleOpenDetails = () => setOpenDetails(true);
    const handleCloseDetails = () => setOpenDetails(false);

    const handleChangeComplete = () =>
        editCard({
            id,
            name,
            attachments,
            priority,

            completed: !completed,
            userIds: user.map((u) => u.id),
        });
    const scrollbarColor = theme.palette.mode === "dark" ? "#444" : "#bbb";
    const scrollbarHoverColor = theme.palette.mode === "dark" ? "#666" : "#888";
    const scrollbarTrackColor =
        theme.palette.mode === "dark" ? "#222" : "#f1f1f1";

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
                            width: 1,
                            borderRadius: 1,

                            boxShadow:
                                "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
                            "&:hover": {
                                boxShadow:
                                    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
                            },

                            display: "flex",
                            flexDirection: "row",

                            cursor: "pointer",
                        }}
                        onClick={handleOpenDetails}
                    >
                        <Checkbox
                            disableRipple
                            checked={completed}
                            icon={
                                <Iconify icon="eva:radio-button-off-outline" />
                            }
                            checkedIcon={
                                <Iconify icon="eva:checkmark-circle-2-outline" />
                            }
                            onChange={handleChangeComplete}
                        />

                        <Box
                            sx={{
                                flexGrow: 1,
                                // overflow: "clip",
                                maxHeight: "170px",
                                overflowX: "hidden",
                                overflowY: "auto",
                                "&::-webkit-scrollbar": {
                                    height: "2px",
                                    width: "9px",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: scrollbarColor,
                                    borderRadius: "10px",
                                },
                                "&::-webkit-scrollbar-thumb:hover": {
                                    backgroundColor: scrollbarHoverColor,
                                },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: scrollbarTrackColor,
                                },
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    height: 72,
                                    lineHeight: "72px",
                                    fontSize: "12px",
                                    width: "200px",
                                    fontWeight: "600",
                                    overflow: "ellipsis",
                                    transition: (theme) =>
                                        theme.transitions.create("opacity", {
                                            duration:
                                                theme.transitions.duration
                                                    .shortest,
                                        }),
                                    ...(completed && {
                                        opacity: 0.48,
                                    }),
                                }}
                            >
                                {name}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    "& > *:not(:last-child)": {
                                        marginBottom: "-35px", // Adjust space between images, much tighter now
                                    },
                                }}
                            >
                                {attachments
                                    .slice(0, attachments.length)
                                    .map((attachment, index) => (
                                        <Stack>
                                            <Typography
                                                textAlign="center"
                                                variant="body2"
                                                fontWeight={500}
                                            >
                                                {t("attachment")} {index}
                                            </Typography>
                                            <Image
                                                key={index}
                                                alt={`attachment-${index + 1}`}
                                                src={attachment}
                                                ratio="16/9"
                                                sx={{
                                                    height: "70px",
                                                    width: "14vw",
                                                    objectFit: "contain",
                                                    borderRadius: "50%",
                                                    transition: (theme) =>
                                                        theme.transitions.create(
                                                            "opacity",
                                                            {
                                                                duration:
                                                                    theme
                                                                        .transitions
                                                                        .duration
                                                                        .shortest,
                                                            }
                                                        ),
                                                    ...(completed && {
                                                        opacity: 0.48,
                                                    }),
                                                }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleOpenModal(attachment);
                                                }}
                                            />
                                        </Stack>
                                    ))}
                            </Box>
                        </Box>
                    </Paper>
                )}
            </Draggable>

            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md">
                <DialogTitle>
                    {t("attachment")}
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                            "&:hover": {
                                backgroundColor: "transparent", // Ensures the background is transparent on hover
                            },
                        }}
                    >
                        <CloseOutlinedIcon
                            sx={{ backgroundColor: "transparent" }}
                        />
                    </IconButton>
                </DialogTitle>
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
