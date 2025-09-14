import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useGetDashboardQuery } from "@/services/dashboard";
import { useRouter } from "next/router";

interface PropertiesProgressProps {
    count: number;
    assignee: number;
}

const PropertiesProgress: FC<PropertiesProgressProps> = ({
    count,
    assignee,
}) => {
    const { data } = useGetDashboardQuery();

    const all = data?.totalProperties ?? 1000;

    const percentage = Math.round((count / all) * 100);
    const router = useRouter();

    const handleRedirectProperties = () => {
        router.push({
            pathname: "/property",
            query: { assignee },
        });
    };
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
        >
            <Box
                width="100%"
                height="8px"
                bgcolor="divider"
                position="relative"
                borderRadius="4px"
                onClick={handleRedirectProperties}
            >
                <Box
                    width={`${percentage}%`}
                    height="100%"
                    bgcolor="warning.main"
                    position="absolute"
                    zIndex={100}
                    top={0}
                    left={0}
                    borderRadius="4px"
                />
            </Box>
            <Typography>{percentage}%</Typography>
        </Stack>
    );
};

export default PropertiesProgress;
