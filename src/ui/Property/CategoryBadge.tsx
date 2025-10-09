import { NormalBadge } from "@/ui/Cards/PropertyCard/styled";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";

interface Props {
    name: string;
}

const CategoryBadge: FC<Props> = ({ name }) => {
    const theme = useTheme();
    const categoryColor = theme.palette.mode === "dark" ? "#b39ddb" : "#3730a3";
    return <NormalBadge name={name} color={categoryColor} />;
};

export default CategoryBadge;
