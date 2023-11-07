import type { ListItemProps as MuiListItemProps } from "@mui/material";
import { Box, ListItemText, Typography } from "@mui/material";
import StyledListItem from "./StyledListItem";
import type { FC } from "react";
import { PreferredLanguageType } from "src/types/enums";
import Image from "next/image";

type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    value: PreferredLanguageType;
}

const EnglishFlagIcon = "/static/icons/uk_flag.svg";
const GreekFlagIcon = "/static/icons/gr_flag.svg";

const ListLanguageItem: FC<ListItemProps> = (props) => {
    const {
        align = "vertical",
        children,
        disableGutters,
        value,
        label,
        ...other
    } = props;

    // Determine the flexDirection based on the 'align' prop
    const flexDirection = align === "horizontal" ? "row" : "column";
    const justifyContent =
        align === "horizontal" ? "space-between" : "flex-start";

    return (
        <StyledListItem
            sx={{
                px: disableGutters ? 0 : 3,
                display: "flex",
                flexDirection, // Set the flexDirection dynamically
                alignItems: "center", // This ensures items are centered vertically within the ListItem
            }}
            {...other}
        >
            <ListItemText
                disableTypography
                primary={<Typography variant="subtitle2">{label}</Typography>}
                sx={{
                    my: 0,
                    flex: 1, // Take up remaining space, pushing the flag icon to the end
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: justifyContent, // Align the icon to the end of the container for 'horizontal'
                }}
            >
                {children || (
                    <Image
                        height={30}
                        width={30}
                        alt={"flag"}
                        src={
                            value === "ENGLISH"
                                ? EnglishFlagIcon
                                : GreekFlagIcon
                        }
                    />
                )}
            </Box>
        </StyledListItem>
    );
};

export default ListLanguageItem;
