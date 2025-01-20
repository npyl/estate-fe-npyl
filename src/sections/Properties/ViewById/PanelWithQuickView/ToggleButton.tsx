import useCookie from "@/hooks/useCookie";
import Checkbox from "@mui/material/Checkbox";
import { FC } from "react";

// --------------------------------------------------------

interface PPQuickViewLayoutCookie {
    sectionNames: string[];
}

const cookieName = "PPQuickViewLayout";

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
            checked={checked}
            onChange={handleChange}
        />
    );
};

export default ToggleButton;
