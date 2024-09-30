import HomeOutLinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LandslideOutlinedIcon from "@mui/icons-material/LandslideOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material";

const getIcons = (sx?: SxProps<Theme>): Record<string, ReactNode> => ({
    RESIDENTIAL: <HomeOutLinedIcon sx={sx} />,
    COMMERCIAL: <BusinessOutlinedIcon sx={sx} />,
    LAND: <LandslideOutlinedIcon sx={sx} />,
    OTHER: <MoreHorizIcon sx={sx} />,
});

export default getIcons;
