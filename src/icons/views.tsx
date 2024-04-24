import React from "react";
import type { SVGProps } from "react";

export function ViewsIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 -3 25 25"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx={12} cy={12} r={3}></circle>
                <path d="M21 12s-1-8-9-8s-9 8-9 8"></path>
            </g>
        </svg>
    );
}
