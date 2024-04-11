import { Stack } from "@mui/material";
import type { FC } from "react";
import Label from "@/components/Label/Label";
import { ILabel } from "src/types/label";
import ListItem from "../item";
import { useTranslation } from "react-i18next";
import ListItemProps from "../types";

interface ListLabelsItemProps extends ListItemProps {
    labels: ILabel[];
}

const ListLabelsItem: FC<ListLabelsItemProps> = ({ labels, ...other }) => {
    const { t } = useTranslation();

    return (
        <ListItem
            {...other}
            label={t("Labels").toString()}
            sx={{
                height: "fit-content",
            }}
        >
            <Stack spacing={1}>
                {labels.map(({ color, name }, i) => (
                    <Label
                        key={i}
                        color={color}
                        width="min-content"
                        maxWidth="100%"
                        name={name}
                    />
                ))}
            </Stack>
        </ListItem>
    );
};

export default ListLabelsItem;
