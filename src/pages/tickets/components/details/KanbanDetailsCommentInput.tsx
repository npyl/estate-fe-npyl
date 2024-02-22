// @mui
import { Button, InputBase, Paper, Stack } from "@mui/material";
// components
import { useAuth } from "src/hooks/use-auth";
import { CustomAvatar } from "src/components/custom-avatar";

// ----------------------------------------------------------------------

export default function KanbanDetailsCommentInput() {
    const { user } = useAuth();

    return (
        <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
            <CustomAvatar
                src={user?.profilePhoto}
                alt={user?.username}
                name={user?.username}
            />

            <Paper variant="outlined" sx={{ p: 1, flexGrow: 1 }}>
                <InputBase
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Type a message"
                    sx={{ px: 1 }}
                />

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                >
                    <Button variant="contained">Comment</Button>
                </Stack>
            </Paper>
        </Stack>
    );
}
