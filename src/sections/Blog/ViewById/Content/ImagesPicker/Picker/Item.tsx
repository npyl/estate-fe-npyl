import { FC, useCallback } from "react";
import {
    Item as BaseItem,
    ItemProps as BaseItemProps,
} from "@/components/upload/preview/MultiFilePreview/getItem";
import { SxProps, Theme } from "@mui/material";

const ItemSx: SxProps<Theme> = {
    border: "4px solid",
    borderRadius: "15px",
    borderColor: "transparent",
    ":hover": {
        borderColor: "info.main",
    },
};

interface ItemProps extends Omit<BaseItemProps, "onClick" | "onChange"> {
    files: File[];
    onChange: (files?: File[] | undefined) => void;
}

const Item: FC<ItemProps> = ({ files, onChange, sx, ...props }) => {
    const itemKey = props.file.key;

    const makeThumbnail = useCallback(() => {
        alert("EDW222!");

        const thumbnail = files.find(({ name }) => name === itemKey);
        if (!thumbnail) return;

        const filtered = files.filter((file) => file.name !== itemKey);
        const reorderedFiles = [thumbnail, ...filtered];

        onChange(reorderedFiles);
    }, [itemKey, files, onChange]);

    return (
        <BaseItem
            sx={{ ...ItemSx, ...sx }}
            onClick={makeThumbnail}
            {...props}
        />
    );
};

export default Item;
