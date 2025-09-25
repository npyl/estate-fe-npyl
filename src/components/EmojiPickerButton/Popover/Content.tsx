import EmojiPicker, { EmojiPickerProps } from "@/components/EmojiPicker";
import { FC } from "react";
import { TranslationType } from "@/types/translation";

interface CategoriesConfig {}

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

interface ContentProps extends EmojiPickerProps {}

const Content: FC<ContentProps> = (props) => {
    return <EmojiPicker {...props} />;
};

export default Content;
