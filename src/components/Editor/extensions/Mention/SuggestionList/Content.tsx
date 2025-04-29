import { MenuItem } from "@mui/material";
import { FC, useMemo } from "react";
import { useAllUsersQuery } from "@/services/user";
import { MentionNodeAttrs } from "./types";
import { IUser } from "@/types/user";

// -------------------------------------------------------------------------

interface ItemProps {
    u: IUser;
    idx: number;
    onSelect: (idx: number) => void;
}

const Item: FC<ItemProps> = ({ u, idx, onSelect }) => (
    <MenuItem value={u.id.toString()} onClick={() => onSelect(idx)}>
        {u.firstName} {u.lastName}
    </MenuItem>
);

const getItem =
    (onSelect: (idx: number) => void) => (u: IUser, idx: number) => (
        <Item key={u.id} u={u} idx={idx} onSelect={onSelect} />
    );

// -------------------------------------------------------------------------

interface ContentProps {
    query: string;
    onSelect: (n: MentionNodeAttrs) => void;
}

const Content: FC<ContentProps> = ({ query, onSelect }) => {
    const { data } = useAllUsersQuery();
    const items = useMemo(
        () =>
            data?.filter(
                ({ firstName, lastName }) =>
                    firstName.toLowerCase().startsWith(query.toLowerCase()) ||
                    lastName.toLowerCase().startsWith(query.toLowerCase())
            ) || [],
        [data, query]
    );

    const selectItem = (index: number) => {
        if (index >= items.length) {
            // Make sure we actually have enough items to select the given index. For
            // instance, if a user presses "Enter" when there are no options, the index will
            // be 0 but there won't be any items, so just ignore the callback here
            return;
        }

        const suggestion = items[index];

        // Set all of the attributes of our Mention node based on the suggestion
        // data. The fields of `suggestion` will depend on whatever data you
        // return from your `items` function in your "suggestion" options handler.
        // Our suggestion handler returns `MentionSuggestion`s (which we've
        // indicated via SuggestionProps<MentionSuggestion>). We are passing an
        // object of the `MentionNodeAttrs` shape when calling `command` (utilized
        // by the Mention extension to create a Mention Node).
        const mentionItem: MentionNodeAttrs = {
            id: suggestion.id.toString(),
            label: `${suggestion.firstName} ${suggestion.lastName}`,
        };

        onSelect(mentionItem);
    };

    return items.map(getItem(selectItem));
};

export default Content;
