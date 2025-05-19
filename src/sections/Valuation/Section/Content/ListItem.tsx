import { ListItem as BaseListItem } from "@/components/List";
import { FC } from "react";
import BaseListItemProps from "@/components/List/types";
import { formatThousands } from "@/utils/formatNumber";

interface ListItemProps extends Omit<BaseListItemProps, "value"> {
    value?: number;
}

const ListItem: FC<ListItemProps> = ({ value: _value, ...props }) => {
    const value = _value ? formatThousands(Math.round(_value)) : "-";
    return <BaseListItem value={value} {...props} />;
};

export default ListItem;
