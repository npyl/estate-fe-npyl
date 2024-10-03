import type { FC } from "react";
import { PreferredLanguageType } from "src/types/enums";
import Image from "next/image";
import ListItem from "../item";
import ListItemProps from "../types";

const EnglishFlagIcon = "/static/flags/uk_flag.svg";
const GreekFlagIcon = "/static/flags/gr_flag.svg";

interface LanguageListItemProps extends Omit<ListItemProps, "value"> {
    value: PreferredLanguageType;
}

const ListLanguageItem: FC<LanguageListItemProps> = ({ value, ...props }) => (
    <ListItem {...props}>
        <Image
            height={30}
            width={30}
            alt={"flag"}
            src={value === "ENGLISH" ? EnglishFlagIcon : GreekFlagIcon}
        />
    </ListItem>
);

export default ListLanguageItem;
