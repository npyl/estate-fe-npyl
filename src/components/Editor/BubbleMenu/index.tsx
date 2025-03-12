import MenuBar from "@/components/Editor/MenuBar";
import { Paper } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";
import Loader from "./Loader";

// --------------------------------------------------------------------

interface IsRangeProps {
    from: number;
    to: number;
}

const isRange = ({ from, to }: IsRangeProps) => from !== to;

// --------------------------------------------------------------------

const BubbleMenu = () => (
    <Loader shouldShow={isRange}>
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
