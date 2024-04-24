import type { FC } from "react";
import ListItem from "../item";
import ListItemProps from "../types";
import { useTranslation } from "react-i18next";

const ListDateItem: FC<ListItemProps> = ({ value, ...props }) => {
    const { i18n } = useTranslation();

    const locale = i18n.language === "el" ? "el-GR" : "en-US";

    return (
        <ListItem
            value={
                value
                    ? new Date(value).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                      })
                    : "-"
            }
            {...props}
        />
    );
};

export default ListDateItem;
