import { CSSProperties } from "react";
import { START_HOUR, TOTAL_HOURS } from "./constant";
import Row from "./Row";

const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR);

// ------------------------------------------------------------------------------------------

const getRow = (hour: number) => <Row key={hour} hour={hour} />;

// ------------------------------------------------------------------------------------------

const columnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
};

const Rows = () => (
    <div style={columnStyle}>
        {/* Rows */}
        {hours.map(getRow)}
    </div>
);

export default Rows;
