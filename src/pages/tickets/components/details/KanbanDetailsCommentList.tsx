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
                    py: 1,
                    px: 1,
                    bgcolor: "background.neutral",
                    borderRadius: "10px",
                }}
            >
                {comments.map((comment) => (
                    <Stack
                        key={comment.id}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <Avatar
                            src={comment.avatar}
                            sx={{ width: "25px", height: "25px" }}
                        />

                        <Stack>
                            {/* <Typography variant="subtitle2">
                                    {" "}
                                    {comment.name}
                                </Typography> */}

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
                                <Stack>
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 0.5 }}
                                    >
                                        {comment.message}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        {fToNow(comment?.createdAt || "")}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </>
    );
}
