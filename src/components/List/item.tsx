import type { ListItemTextProps } from "@mui/material";
import { ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import StyledListItem from "./styled";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import ListItemProps, { Direction } from "./types";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useTranslation } from "react-i18next";

interface CustomProps extends ListItemTextProps {
    align?: Direction;
    hidePrice?: boolean;
}

const CustomListItemText = styled(ListItemText)<CustomProps>(
    ({ align, hidePrice }) => ({
        display: "flex",
        // horizontal vs. vertical mode
        ...(align === "horizontal"
            ? {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
              }
            : {}),
    })
);

// --------------------------------------------------------------------------------

const ListItem: FC<ListItemProps & { hidePrice?: boolean }> = (props) => {
    const {
        align = "horizontal",
        children,
        disableGutters,
        value,
        label,
        hidePrice,
        ...other
    } = props;
    const { i18n, t } = useTranslation();

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
                primary={
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Typography variant="subtitle2">{label}</Typography>
                        {hidePrice && (
                            <Tooltip
                                title={t(
                                    "The price for this property is hidden on the public site"
                                )}
                                placement="top"
                            >
                                <VisibilityOffOutlinedIcon
                                    sx={{ fontSize: 16 }}
                                    color="primary"
                                />
                            </Tooltip>
                        )}
                    </Stack>
                }
                secondary={
                    children || (
                        <Typography
                            color="text.secondary"
                            variant="body2"
                            textAlign="right"
                        >
                            {value?.toString() || ""}
                        </Typography>
                    )
                }
            />
        </StyledListItem>
    );
};

export default ListItem;
