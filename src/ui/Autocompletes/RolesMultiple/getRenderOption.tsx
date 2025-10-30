import { MenuItem, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import { getOptionTestId } from "./constant";
import Role from "@/ui/Role";
import { RoleMini } from "@/types/roles";

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 0.5,
    width: "100%",
};

interface RenderOptionProps extends React.HTMLAttributes<HTMLLIElement> {
    option: RoleMini;
}

const RenderOption: FC<RenderOptionProps> = (props) => {
    const { option, ...otherProps } = props;

    return (
        <MenuItem
            data-testid={getOptionTestId(option.id)}
            sx={OptionSx}
            {...otherProps}
        >
            <Role r={option} />
        </MenuItem>
    );
};

const getRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: RoleMini
) => {
    const { key, ...other } = props;
    return <RenderOption key={key} option={option} {...other} />;
};

export { RenderOption };
export default getRenderOption;
