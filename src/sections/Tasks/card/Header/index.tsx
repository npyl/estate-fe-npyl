import { SpaceBetween } from "@/components/styled";
import { FC } from "react";
import { IUserMini } from "@/types/user";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@/components/Avatar";
import Tooltip from "@mui/material/Tooltip";
import TaskLabel from "../CardDialog/TaskLabel";
import { SxProps, Theme } from "@mui/material";
import MenuButton from "./MenuButton";

const AvatarSx: SxProps<Theme> = {
    height: "35px",
    width: "35px",
};

const TaskLabelSx: SxProps<Theme> = {
    ".MuiSvgIcon-root": {
        fontSize: "1rem",
    },
};

interface HeaderProps {
    taskId: number;
    assignee: IUserMini;
    completed: boolean;
    uniqueCode: string;
}

const Header: FC<HeaderProps> = ({
    taskId,
    assignee,
    completed,
    uniqueCode,
}) => {
    const fullname = `${assignee?.firstName || ""} ${assignee?.lastName || ""}`;

    return (
        <SpaceBetween alignItems="center">
            <Stack justifyContent="flex-start" direction="row" gap={2}>
                <Tooltip title={fullname}>
                    <Avatar
                        firstName={assignee?.firstName}
                        lastName={assignee?.lastName}
                        src={assignee?.avatar}
                        sx={AvatarSx}
                    />
                </Tooltip>
                <TaskLabel taskCode={uniqueCode} sx={TaskLabelSx} />
            </Stack>

            <Stack spacing={1} direction="row" alignItems="center">
                {completed ? <CheckIcon color="success" /> : null}
                <MenuButton taskId={taskId} />
            </Stack>
        </SpaceBetween>
    );
};

export default Header;
