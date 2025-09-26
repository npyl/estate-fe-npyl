import { styled } from "@mui/material";
import { EmojiPickerListCategoryHeaderProps } from "frimousse";
import { FC } from "react";

const Div = styled("div")(({ theme }) => ({
    position: "sticky",
    top: 0,
    padding: theme.spacing(1),
    boxShadow: theme.shadows[15],
    backgroundColor: theme.palette.background.default,
}));

const CategoryHeader: FC<EmojiPickerListCategoryHeaderProps> = ({
    category,
    ...props
}) => {
    return <Div {...props}>{category.label}</Div>;
};

export default CategoryHeader;
