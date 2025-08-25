import { Stack, StackProps } from "@mui/material";
import { FC } from "react";
import useData from "./useData";
import useMethods from "./useMethods";
import getId from "./getId";
import { useIds } from "../../Context";

const ChosenFilters: FC<StackProps> = (props) => {
    const ids = useIds();
    const data = useData();
    const methods = useMethods();

    return (
        <Stack direction="row" spacing={1} {...props}>
            {ids.map(getId(data, methods))}
        </Stack>
    );
};

export default ChosenFilters;
