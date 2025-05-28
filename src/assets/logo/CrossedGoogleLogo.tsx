import GoogleIcon from "@mui/icons-material/Google";
import { SvgIcon } from "@mui/material";

const CrossedGoogleIcon = () => (
    <SvgIcon>
        <GoogleIcon />
        <path
            d="M22 2L2 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </SvgIcon>
);

export default CrossedGoogleIcon;
