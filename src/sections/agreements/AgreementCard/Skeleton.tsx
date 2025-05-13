import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const AgreementCardSkeleton = () => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
            sx={{
                width: "100%",
                height: 250,
                p: 1,
                display: "flex",
                flexDirection: "row",
                borderRadius: "15px",
            }}
        >
            {/* Image skeleton */}
            <Skeleton
                variant="rectangular"
                width="30%"
                height="100%"
                sx={{
                    borderRadius: "5px",
                }}
            />

            <Stack
                position="relative"
                width="70%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                {/* Labels skeleton */}
                <Stack
                    position="absolute"
                    top={0}
                    right={0}
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                >
                    <Skeleton
                        variant="rectangular"
                        width={60}
                        height={30}
                        sx={{
                            borderRadius: "15px",
                        }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={60}
                        height={30}
                        sx={{
                            borderRadius: "15px",
                        }}
                    />
                </Stack>

                {/* Property details skeleton */}
                <Stack spacing={1}>
                    <Skeleton variant="text" width="80%" height={30} />
                    <Skeleton variant="text" width={100} />
                </Stack>

                {/* Controls skeleton */}
                <Stack
                    position="absolute"
                    bottom={0}
                    right={0}
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                >
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton variant="circular" width={30} height={30} />
                </Stack>
            </Stack>
        </Card>
    </Grid>
);

export default AgreementCardSkeleton;
