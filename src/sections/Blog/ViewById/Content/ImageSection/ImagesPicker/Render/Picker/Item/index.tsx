import { FC, useCallback, useMemo } from "react";
import {
    Item as BaseItem,
    ItemProps as BaseItemProps,
} from "@/components/upload/preview/MultiFilePreview/getItem";
import { Stack, SxProps, Theme } from "@mui/material";
import {
    MAKE_THUMBNAIL_LABEL,
    MakeThumbnailLabel,
    ThumbnailLabel,
} from "./Labels";

const ItemSx: SxProps<Theme> = {
    ":hover": {
        backgroundColor: "action.hover",
    },
};

const ContainerSx: SxProps<Theme> = {
    ":hover": {
        [`.${MAKE_THUMBNAIL_LABEL}`]: {
            display: "block",
        },
    },
};

interface ItemProps extends Omit<BaseItemProps, "onClick" | "onChange"> {
    files: File[];
    onChange: (f: File[]) => void;
}

const Item: FC<ItemProps> = ({ files, onChange, sx, ...props }) => {
    const itemKey = props.file.key;
    const isThumbnail = useMemo(
        () => files.at(0)?.name === itemKey,
        [files, itemKey]
    );

    const makeThumbnail = useCallback(() => {
        if (isThumbnail) return;

        const thumbnail = files.find(({ name }) => name === itemKey);
        if (!thumbnail) return;

        const filtered = files.filter((file) => file.name !== itemKey);
        const reorderedFiles = [thumbnail, ...filtered];

        onChange(reorderedFiles);
    }, [isThumbnail, itemKey, files, onChange]);

    return (
        <Stack width={1} position="relative" sx={ContainerSx}>
            <BaseItem
                sx={{ ...ItemSx, ...sx }}
                onClick={makeThumbnail}
                width={1}
                {...props}
            />

            {!isThumbnail ? <MakeThumbnailLabel /> : null}
            {isThumbnail ? <ThumbnailLabel /> : null}
        </Stack>
    );
};

export default Item;
