import { MenuItem, SxProps, Theme, Typography } from "@mui/material";
import { IUserMini } from "@/types/user";
import { FC } from "react";
import Avatar from "@/components/Avatar";
import { getOptionTestId } from "./constant";

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 0.5,
    width: "100%",
};

interface RenderOptionProps extends React.HTMLAttributes<HTMLLIElement> {
    option: IUserMini;
}

const RenderOption: FC<RenderOptionProps> = (props) => {
    const { option, ...otherProps } = props;

    const { id, avatar, firstName, lastName } = option;
    const fullname = `${firstName || ""} ${lastName || ""}`;

    return (
        <MenuItem
            data-testid={getOptionTestId(id)}
            sx={OptionSx}
            {...otherProps}
        >
            <Avatar
                src={avatar}
                firstName={firstName}
                lastName={lastName}
                sx={{ width: 22, height: 22 }}
            />
            <Typography>{fullname}</Typography>
        </MenuItem>
    );
};

const getRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: IUserMini
) => {
    const { key, ...other } = props;
    return <RenderOption key={key} option={option} {...other} />;
};

export { RenderOption };
export default getRenderOption;
