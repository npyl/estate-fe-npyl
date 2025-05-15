// components/CustomerTabCounter.tsx
import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const Badge = styled("span")`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgb(51, 102, 255);
    color: #fff;
    font-size: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-left: 6px;
`;

type Props = {
    label: string;
    count?: number;
};

const CustomerTabCounter = ({ label, count = 0 }: Props) => {
    if (count <= 0) return label;

    return (
        <Box display="inline-flex" alignItems="center">
            {label}
            <Badge>{count}</Badge>
        </Box>
    );
};

export default CustomerTabCounter;
