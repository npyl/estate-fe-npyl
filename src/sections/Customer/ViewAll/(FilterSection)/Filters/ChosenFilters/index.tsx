import { Stack, StackProps } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectIds } from "src/slices/customer/filters";
import useData from "./useData";
import useMethods from "./useMethods";
import getId from "./getId";

const ChosenFilters: FC<StackProps> = (props) => {
    const ids = useSelector(selectIds);
    const data = useData();
    const methods = useMethods();

    return (
        <Stack direction="row" spacing={1} {...props}>
            {ids.map(getId(data, methods))}
        </Stack>
    );
};

export default ChosenFilters;
