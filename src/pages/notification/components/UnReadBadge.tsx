import React from "react";
import { styled } from "@mui/material/styles";

const CircleUnReadNotifications = styled("div")`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(51, 102, 255);
    color: #fff;
    font-size: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 0 2px white; /* Added white border for better visibility */
    font-weight: bold; /* Added to make the number more readable */
`;

interface UnreadBadgeProps {
    count: number;
}

const UnreadBadge: React.FC<UnreadBadgeProps> = ({ count }) => {
    if (count <= 0) return null;

    return <CircleUnReadNotifications>{count}</CircleUnReadNotifications>;
};

export default UnreadBadge;
