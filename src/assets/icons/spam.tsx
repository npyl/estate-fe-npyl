import { createSvgIcon } from "@mui/material";

const SpamIcon = createSvgIcon(
    <svg
        viewBox="0 0 24 24"
        role="img"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
    >
        <polygon points="16 3 21 8 21 16 16 21 8 21 3 16 3 8 8 3" />
        <path d="M12,8 L12,13" /> <line x1="12" y1="16" x2="12" y2="16" />
    </svg>,
    "SpamIcon"
);

export default SpamIcon;
