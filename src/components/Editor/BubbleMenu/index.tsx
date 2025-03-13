import MenuBar from "@/components/Editor/MenuBar";
import { Paper } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";
import Loader from "./Loader";
import { FC } from "react";

// --------------------------------------------------------------------

const isInViewport = (element: HTMLDivElement): boolean => {
    const rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
};

interface IsRangeProps {
    from: number;
    to: number;
}

/**
 * Make sure we have selected a range AND the menubar is not inside view
 * @param menubar
 * @returns
 */
const isRange =
    (menubar: HTMLDivElement) =>
    ({ from, to }: IsRangeProps) =>
        from !== to && !isInViewport(menubar);

// --------------------------------------------------------------------

interface BubbleMenuProps {
    menubar: HTMLDivElement;
}

const BubbleMenu: FC<BubbleMenuProps> = ({ menubar }) => (
    <Loader shouldShow={isRange(menubar)}>
        <MenuBar
            component={Paper}
            width="fit-content"
            border="1px solid"
            p={0.5}
            borderColor={getBorderColor2}
        />
    </Loader>
);

export default BubbleMenu;
