import EmojiPicker from "@/components/EmojiPicker";
import Popper, { PopperProps } from "@mui/material/Popper";
import { FC, useMemo } from "react";
import { EmojiPickerProps } from "./types";
import { ClickAwayListener } from "@mui/material";
import { CategoriesConfig } from "emoji-picker-react/dist/config/categoryConfig";
import { TranslationType } from "@/types/translation";
import { useTranslation } from "react-i18next";

// TODO: these cause error with webpack so we define them here
enum Categories {
    SUGGESTED = "suggested",
    CUSTOM = "custom",
    SMILEYS_PEOPLE = "smileys_people",
    ANIMALS_NATURE = "animals_nature",
    FOOD_DRINK = "food_drink",
    TRAVEL_PLACES = "travel_places",
    ACTIVITIES = "activities",
    OBJECTS = "objects",
    SYMBOLS = "symbols",
    FLAGS = "flags",
}

// INFO: everything *but* suggested
const getCATEGORIES = (t: TranslationType): CategoriesConfig => [
    {
        category: Categories.ACTIVITIES,
        name: t("Activities"),
    },
    {
        category: Categories.ANIMALS_NATURE,
        name: t("Animals & Nature"),
    },
    {
        category: Categories.FLAGS,
        name: t("Flags"),
    },
    {
        category: Categories.FOOD_DRINK,
        name: t("Foods & Drinks"),
    },
    {
        category: Categories.OBJECTS,
        name: t("Objects"),
    },

    {
        category: Categories.SMILEYS_PEOPLE,
        name: t("People"),
    },
    {
        category: Categories.SYMBOLS,
        name: t("Symbols"),
    },
    {
        category: Categories.TRAVEL_PLACES,
        name: t("Travel Places"),
    },
];

interface Props {
    anchorEl: HTMLElement;
    PickerProps?: EmojiPickerProps;
    PopperProps?: Omit<PopperProps, "open">;
    onClose: VoidFunction;
}

const EmojiPickerPopper: FC<Props> = ({
    anchorEl,
    PickerProps,
    PopperProps,
    onClose,
}) => {
    const { t } = useTranslation();
    const CATEGORIES = useMemo(() => getCATEGORIES(t), [t]);
    return (
        <ClickAwayListener onClickAway={onClose}>
            <Popper open anchorEl={anchorEl} placement="top" {...PopperProps}>
                <EmojiPicker
                    open
                    lazyLoadEmojis
                    searchDisabled
                    previewConfig={{ showPreview: false }}
                    categories={CATEGORIES}
                    {...PickerProps}
                />
            </Popper>
        </ClickAwayListener>
    );
};

export default EmojiPickerPopper;
