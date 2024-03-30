import type {
    ListItemTextProps,
    ListItemProps as MuiListItemProps,
} from "@mui/material";
import { ListItemText, Typography } from "@mui/material";
import StyledListItem from "./StyledListItem";
import { styled } from "@mui/material/styles";
import type { FC } from "react";

interface CustomProps extends ListItemTextProps {
    align?: Direction;
}

const CustomListItemText = styled(ListItemText)<CustomProps>(({ align }) => ({
    display: "flex",
    // horizontal vs. vertical mode
    ...(align === "horizontal"
        ? {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
          }
        : {}),
}));

// --------------------------------------------------------------------------------

type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    value?: any | null;
}

const ListItem: FC<ListItemProps> = (props) => {
    const {
        align = "horizontal",
        children,
        disableGutters,
        value,
        label,
        ...other
    } = props;

    return (
        <StyledListItem
            sx={{
                px: disableGutters ? 0 : 3,
            }}
            {...other}
        >
            <CustomListItemText
                align={align}
                disableTypography
                primary={<Typography variant="subtitle2">{label}</Typography>}
                secondary={
                    children || (
                        <Typography color="textSecondary" variant="body2">
                            {value?.toString() || ""}
                        </Typography>
                    )
                }
            />
        </StyledListItem>
    );
};

export default ListItem;
