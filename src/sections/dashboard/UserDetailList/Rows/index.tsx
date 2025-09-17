import { PropertiesPerUserList } from "@/types/dashboard";
import { SxProps, Theme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { ResponsiveCounts } from "@/sections/dashboard/UserDetailList/Content";
import PropertiesProgress from "./PropertiesProgress";
import User from "./User";
import { useGetDashboardQuery } from "@/services/dashboard";

const UserRowSx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: "divider",
    "&:nth-of-type(even)": {
        bgcolor: ({ palette: { mode, neutral } }) =>
            mode === "light" ? neutral?.[200] : neutral?.[800],
    },
    ":not(last-of-type)": {
        borderBottom: 0,
    },
    borderLeft: 0,
    borderRight: 0,
    py: 0.5,
};

interface UserRowProps {
    ul: PropertiesPerUserList;
}

const UserRow: FC<UserRowProps> = ({ ul }) => {
    const { userDetails, properties } = ul;

    return (
        <Grid container alignItems="center" px={1} sx={UserRowSx}>
            <Grid xs={4} md={3.2}>
                <User u={userDetails} />
            </Grid>

            {/* ----- */}
            <ResponsiveCounts {...ul} />
            {/* ----- */}

            <Grid xs={4} md={2.8}>
                <PropertiesProgress
                    count={properties}
                    assignee={userDetails?.id}
                />
            </Grid>
        </Grid>
    );
};

const getUserRow = (ul: PropertiesPerUserList) => (
    <UserRow key={ul.userDetails.id} ul={ul} />
);

const Rows = () => {
    const { data } = useGetDashboardQuery();
    const users = data?.propertiesPerUserList ?? [];
    return users?.map(getUserRow);
};

export default Rows;
