import { CSSProperties, FC, HTMLAttributes } from "react";
import { CELL_CLASSNAME } from "../constants";
import toLocalDate from "@/utils/toLocalDate";

const getCellTestId = (date: string) => {
    const d = toLocalDate(date);
    return `CELL-${d}`;
};

// INFO: this is important to act as a full-height container
const CellStyle: CSSProperties = {
    position: "relative",
    height: "100%",
};

interface BaseCellProps extends HTMLAttributes<HTMLDivElement> {
    date: Date;
}

const BaseCell: FC<BaseCellProps> = ({ date, style, ...props }) => {
    const dateISOString = date.toISOString();

    const dataTestId = getCellTestId(dateISOString);
    const dataDate = dateISOString;

    return (
        <div
            className={CELL_CLASSNAME}
            data-testid={dataTestId}
            data-date={dataDate}
            style={{ ...CellStyle, ...style }}
            {...props}
        />
    );
};

export { getCellTestId };
export default BaseCell;
