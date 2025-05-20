import Avatar from "@/components/Avatar";
import { useGetNamesQuery } from "@/services/customers";
import { useAllUsersQuery } from "@/services/user";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface SenderProps {
    from: string;
}

const Sender: FC<SenderProps> = ({ from }) => {
    const { data: users } = useAllUsersQuery();
    const { data: customers } = useGetNamesQuery();
    const user = users?.find(({ workspaceEmail }) => workspaceEmail === from);
    const customer = customers?.find(({ email }) => email === from);

    const fullname = user
        ? `${user?.firstName || ""} ${user?.lastName || ""}`
        : customer
          ? `${customer?.firstName || ""} ${customer?.firstName || ""}`
          : "";

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {user ? (
                <Avatar
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    src={user?.avatar}
                />
            ) : null}

            {customer ? (
                <Avatar
                    firstName={customer?.firstName}
                    lastName={customer?.lastName}
                />
            ) : null}

            <Stack spacing={-0.5}>
                <Typography variant="body1" fontWeight="bold">
                    {fullname}
                </Typography>
                <Typography color="text.secondary">{from || ""}</Typography>
            </Stack>
        </Stack>
    );
};

export default Sender;
