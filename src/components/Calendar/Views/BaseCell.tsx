import { CSSProperties, FC, HTMLAttributes } from "react";
import { CELL_CLASSNAME } from "../constants";
import toLocalDate from "@/utils/toLocalDate";

const getCellTestId = (date: Date) => {
    const d = toLocalDate(date.toISOString());
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
    const dataTestId = getCellTestId(date);
    const dataDate = date.toISOString();

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
