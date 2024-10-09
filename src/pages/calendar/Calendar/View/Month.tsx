import { useMemo } from "react";
import { WEEKDAYS } from "../constants";

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const MonthView = ({ date }: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysCount = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const days = useMemo(() => {
        let res = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            res.push(
                <div
                    key={`empty-${i}`}
                    style={{ border: "1px solid black", padding: "5px" }}
                />
            );
        }

        // Add cells for each day of the month
        for (let i = 1; i <= daysCount; i++) {
            res.push(
                <div
                    key={i}
                    style={{ border: "1px solid black", padding: "5px" }}
                >
                    {i}
                </div>
            );
        }

        return res;
    }, []);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "1px",
            }}
        >
            {/* Headers */}
            {WEEKDAYS.map((day) => (
                <div
                    key={day}
                    style={{
                        fontWeight: "bold",
                        border: "1px solid black",
                        padding: "5px",
                    }}
                >
                    {day}
                </div>
            ))}

            {days}
        </div>
    );
};

export default MonthView;
