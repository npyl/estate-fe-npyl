import Avatar from "@/components/Avatar";
import { SxProps, Theme } from "@mui/material/styles";

const AvatarSx: SxProps<Theme> = {
    width: 30,
    height: 30,
    bgcolor: "primary.main",
    color: "white !important",
};

const PlaceholderAvatar = () => <Avatar sx={AvatarSx} />;
export default PlaceholderAvatar;
