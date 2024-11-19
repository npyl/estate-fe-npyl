import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/use-auth";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";

const ReporterAvatar = React.memo(() => {
    const { user } = useAuth();
    return (
        <InputAdornment position="start">
            <Avatar
                src={user?.avatar}
                firstName={user?.firstName}
                lastName={user?.lastName}
            />
        </InputAdornment>
    );
});

export default ReporterAvatar;
