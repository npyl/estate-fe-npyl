// @mui
import { Avatar, Stack, Typography } from "@mui/material";
// utils
import { fToNow } from "@/utils/formatTime";
// @types
import { IKanbanComment } from "src/types/kanban";
// components
import Image from "@/components/image";

// ----------------------------------------------------------------------

type Props = {
    comments: IKanbanComment[];
};

export default function KanbanDetailsCommentList({ comments }: Props) {
    const imagesLightbox = comments
        .filter((comment) => comment.messageType === "image")
        .map((item) => item.message);

    return (
        <>
            <Stack
                spacing={3}
                sx={{
                    py: 1.5,
                    px: 1.5,
                    bgcolor: "background.neutral",
                    borderRadius: "8px",
                }}
            >
                {comments.map((comment) => (
                    <Stack key={comment.id} direction="row" spacing={2}>
                        <Avatar
                            src={comment.avatar}
                            sx={{ width: "25px", height: "25px" }}
                        />

                        <Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                {/* <Typography variant="subtitle2">
                                    {" "}
                                    {comment.name}
                                </Typography> */}

                                <Typography
                                    variant="caption"
                                    sx={{ color: "text.secondary" }}
                                >
                                    {fToNow(comment?.createdAt || "")}
                                </Typography>
                            </Stack>

                            {comment.messageType === "image" ? (
                                <Image
                                    alt={comment.message}
                                    src={comment.message}
                                    sx={{
                                        mt: 1,
                                        borderRadius: 1,
                                    }}
                                />
                            ) : (
                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    {comment.message}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </>
    );
}
