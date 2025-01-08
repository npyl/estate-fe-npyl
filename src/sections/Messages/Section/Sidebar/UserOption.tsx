import Avatar from "@/components/Avatar";
import { getBorderColor2 } from "@/theme/borderColor";
import { IUser } from "@/types/user";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useCallback } from "react";
import { SxProps, Theme } from "@mui/material";
import StatusIndicator from "./StatusIndicator";
import { useSelectedUserContext } from "../SelectedUser";

// ----------------------------------------------------------------------

const getBgColor = ({ palette: { mode, neutral } }: Theme) =>
    mode === "light" ? neutral?.[200] : neutral?.[800];

const getUserOptionSx = (selected: boolean): SxProps<Theme> => ({
    alignItems: "center",

    p: 1,

    borderBottom: "1px solid",
    borderColor: getBorderColor2,

    "&:hover": {
        bgcolor: getBgColor,
        cursor: "pointer",
    },

    ...(selected ? { bgcolor: getBgColor } : {}),

    "&:last-child": {
        border: "none",
    },
});

interface UserOptionProps {
    u: IUser;
}

const UserOption: FC<UserOptionProps> = ({ u }) => {
    const { userId, setUserId } = useSelectedUserContext();

    const isSelected = userId === u.id;

    const { avatar, firstName, lastName } = u || {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    const handleClick = useCallback(() => setUserId(u?.id), []);

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={getUserOptionSx(isSelected)}
            onClick={handleClick}
        >
            <Avatar src={avatar} firstName={firstName} lastName={lastName} />
            <Stack width="100%">
                <Typography variant="body2" fontWeight="bold">
                    {fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Το τελευταίο που έγραψε!
                </Typography>
            </Stack>
            <Stack width="10%" height={1} alignItems="end">
                <Typography
                    variant="body2"
                    fontWeight="300"
                    color="text.secondary"
                >
                    Date
                </Typography>
                <StatusIndicator />
            </Stack>
        </Stack>
    );
};

export default UserOption;
