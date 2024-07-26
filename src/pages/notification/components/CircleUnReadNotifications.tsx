import React from "react";
import { styled } from "@mui/material/styles";

const CircleUnReadNotifications = styled("div")`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(51, 102, 255);
    color: #fff;
    font-size: 10px; /* Adjusted to fontSize small */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -8px; /* Adjusted to align the circle correctly */
    top: 10px; /* Adjusted to align the circle correctly */
    box-shadow: 0 0 0 2px white; /* Added white border for better visibility */
    font-weight: bold; /* Added to make the number more readable */
`;

export default CircleUnReadNotifications;
