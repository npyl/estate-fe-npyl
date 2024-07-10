import { styled } from "@mui/material/styles";

type Variant = "light" | "primary";

interface LogoProps {
    variant?: Variant;
}

export const Logo = styled((props: LogoProps) => {
    const { variant, ...other } = props;

    const color = variant === "light" ? "#C1C4D6" : "#5048E5";

    return (
        <svg
            width="60"
            height="42"
            viewBox="0 0 60 42"
            xmlns="http://www.w3.org/2000/svg"
            {...other}
        >
            {/* Left smaller building */}
            <rect x="2" y="20" width="15" height="20" fill={color} />
            <rect x="4" y="22" width="5" height="5" fill="white" />
            <rect x="10" y="22" width="5" height="5" fill="white" />
            <rect x="4" y="29" width="5" height="5" fill="white" />
            <rect x="10" y="29" width="5" height="5" fill="white" />

            {/* Main building body */}
            <rect x="18" y="15" width="22" height="25" fill={color} />

            {/* Roof */}
            <path d="M15 15 L29 5 L43 15 Z" fill={color} />

            {/* Stylized A */}
            <path
                d="M24 22 L29 10 L34 22 L32 22 L29 16 L26 22 Z"
                fill="white"
            />

            {/* Windows for aesthetic */}
            <rect x="21" y="18" width="5" height="5" fill="white" />
            <rect x="32" y="18" width="5" height="5" fill="white" />
            <rect x="21" y="28" width="5" height="5" fill="white" />
            <rect x="32" y="28" width="5" height="5" fill="white" />

            {/* Right smaller building */}
            <rect x="41" y="20" width="15" height="20" fill={color} />
            <rect x="43" y="22" width="5" height="5" fill="white" />
            <rect x="49" y="22" width="5" height="5" fill="white" />
            <rect x="43" y="29" width="5" height="5" fill="white" />
            <rect x="49" y="29" width="5" height="5" fill="white" />
        </svg>
    );
})``;
