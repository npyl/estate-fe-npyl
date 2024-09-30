// @mui
import { Stack, Skeleton, Box, Paper } from "@mui/material";

// ----------------------------------------------------------------------

export default function SkeletonKanbanColumn() {
    return (
        <Box
            gap={3}
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            width="100%"
        >
            {[...Array(3)].map((_, index) => (
                <Paper
                    variant="outlined"
                    key={index}
                    sx={{ p: 2.5, width: "100%" }}
                >
                    <Stack spacing={2}>
                        <Skeleton
                            variant="rectangular"
                            sx={{ paddingTop: "75%", borderRadius: 1.5 }}
                        />

                        {index === 0 && (
                            <Skeleton
                                variant="rectangular"
                                sx={{ paddingTop: "25%", borderRadius: 1.5 }}
                            />
                        )}

                        {index !== 2 && (
                            <Skeleton
                                variant="rectangular"
                                sx={{ paddingTop: "25%", borderRadius: 1.5 }}
                            />
                        )}
                    </Stack>
                </Paper>
            ))}
        </Box>
    );
}
