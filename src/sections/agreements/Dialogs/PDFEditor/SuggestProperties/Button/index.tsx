import { FC, useRef } from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import useDialog from "@/hooks/useDialog";
import getRow from "./getRow";
import { StyledIconButton } from "./styled";
import dynamic from "next/dynamic";
const Popover = dynamic(() => import("./Popover"));

interface Props {
    schemaKey: string;
}

const Button: FC<Props> = ({ schemaKey }) => {
    const row = getRow(schemaKey);

    const anchorRef = useRef(null);

    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <StyledIconButton ref={anchorRef} onClick={openPopover}>
                <AutoFixHighIcon />
            </StyledIconButton>

            {isOpen && row > -1 ? (
                <Popover
                    row={row}
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default Button;
