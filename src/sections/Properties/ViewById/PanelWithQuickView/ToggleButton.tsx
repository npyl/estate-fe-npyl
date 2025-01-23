import CookieNames from "@/constants/cookies";
import useCookie from "@/hooks/useCookie";
import Checkbox from "@mui/material/Checkbox";
import { FC } from "react";
import { PPQuickViewLayoutCookie } from "./types";
import { Star } from "@mui/icons-material";
import { SxProps, Theme } from "@mui/material";

// --------------------------------------------------------

const cookieName = CookieNames.QuickViewLayout;

const CheckboxSx: SxProps<Theme> = {
    pb: 0.5,
};

interface ToggleButtonProps {
    sectionName: string;
}

const ToggleButton: FC<ToggleButtonProps> = ({ sectionName }) => {
    const [layout, setCookie] = useCookie<PPQuickViewLayoutCookie>(cookieName, {
        sectionNames: [],
    });

    const checked = layout?.sectionNames?.includes(sectionName);

    const handleChange = (_: any, b: boolean) => {
        const old = layout?.sectionNames || [];
        let updatedLayout = layout || {};

        if (b) {
            updatedLayout = {
                ...updatedLayout,
                sectionNames: [...old, sectionName],
            };
        } else {
            updatedLayout = {
                ...updatedLayout,
                sectionNames: old.filter((name) => name !== sectionName),
            };
        }

        setCookie(updatedLayout);
    };

    return (
        <Checkbox
            className="ToggleButton"
            icon={<Star />}
            checkedIcon={<Star color="warning" />}
            checked={checked}
            onChange={handleChange}
            sx={CheckboxSx}
        />
    );
};

export default ToggleButton;
