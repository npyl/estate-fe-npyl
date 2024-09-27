import Checkbox from "@mui/material/Checkbox";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { MouseEvent, FC } from "react";

const handleClick = (e: MouseEvent<HTMLButtonElement>) => e.preventDefault();

const CustomCheckbox: FC<GridRenderCellParams> = () => (
    <Checkbox
        // value={props.value}
        // onChange={props.onChange}
        onClick={handleClick}
    />
);

export default CustomCheckbox;
