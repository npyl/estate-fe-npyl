import { TODAY } from "@/components/BaseCalendar/constants";
import { Button } from "@mui/material";
import { FC, useCallback } from "react";

interface Props {
    onClick: (d: Date) => void;
}

const TodayButton: FC<Props> = ({ onClick }) => {
    const handleClick = useCallback(() => onClick(TODAY), []);
    return <Button onClick={handleClick}>Today</Button>;
};

export default TodayButton;
