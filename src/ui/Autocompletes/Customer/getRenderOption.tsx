import { SxProps, Theme } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { FC } from "react";
import { ICustomerMini } from "@/types/customer";
import PlaceholderAvatar from "./PlaceholderAvatar";

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 1,
};

interface RenderOptionProps extends React.HTMLAttributes<HTMLLIElement> {
    option: ICustomerMini;
}

const RenderOption: FC<RenderOptionProps> = (props) => {
    const { option, ...otherProps } = props;

    return (
        <ListItem sx={OptionSx} {...otherProps}>
            <PlaceholderAvatar />
            {option?.firstName || ""} {option?.lastName || ""}
        </ListItem>
    );
};

const getRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: number },
    option: ICustomerMini
) => {
    const { key, ...other } = props;
    return <RenderOption key={key} option={option} {...other} />;
};

export { RenderOption };
export default getRenderOption;
