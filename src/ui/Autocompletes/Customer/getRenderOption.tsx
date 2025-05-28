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
    key: any;
    option: ICustomerMini;
}

const RenderOption: FC<RenderOptionProps> = (props) => {
    const { key, option, ...otherProps } = props;

    return (
        <ListItem key={option.id} sx={OptionSx} {...otherProps}>
            <PlaceholderAvatar />
            {option?.firstName || ""} {option?.lastName || ""}
        </ListItem>
    );
};

const getRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: ICustomerMini
) => <RenderOption option={option} {...props} />;

export { RenderOption };
export default getRenderOption;
