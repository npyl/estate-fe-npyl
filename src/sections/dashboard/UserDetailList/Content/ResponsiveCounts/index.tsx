import { FC } from "react";
import Counts, { CountsProps } from "./Counts";
import CountsPopover from "./CountsPopover";

const ResponsiveCounts: FC<CountsProps> = (props) => (
    <>
        <Counts {...props} />

        <CountsPopover>
            <Counts popover {...props} />
        </CountsPopover>
    </>
);

export default ResponsiveCounts;
