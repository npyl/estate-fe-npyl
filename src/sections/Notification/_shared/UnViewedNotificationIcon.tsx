import { createSvgIcon } from "@mui/material";
import React from "react";

const UnViewedNotificationIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="16"
        height="16"
        viewBox="0 0 256 256"
    >
        <defs>
            <radialGradient
                cx="16"
                cy="16"
                r="16"
                gradientUnits="userSpaceOnUse"
                id="color-1_JvrEHvnKnYQs_gr1"
            >
                <stop offset="0" stopColor="#3366ff"></stop>
                <stop offset="0.302" stopColor="#4857ff"></stop>
                <stop offset="0.497" stopColor="#3860ff"></stop>
                <stop offset="0.578" stopColor="#2b63ff"></stop>
                <stop offset="0.726" stopColor="#5ebae5"></stop>
                <stop offset="0.768" stopColor="#33e2ff"></stop>
                <stop offset="0.778" stopColor="#a8bcf8"></stop>
                <stop offset="1" stopColor="#ffffff" stopOpacity="0"></stop>
            </radialGradient>
        </defs>
        <g
            fill="url(#color-1_JvrEHvnKnYQs_gr1)"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            style={{ mixBlendMode: "normal" }}
        >
            <g transform="scale(6,6)">
                <circle cx="16" cy="16" r="16"></circle>
            </g>
        </g>
    </svg>,
    "unViewedIcon"
);

export default UnViewedNotificationIcon;
