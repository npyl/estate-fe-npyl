import React, { PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

interface AnimatedTableRowProps extends PropsWithChildren {
    onClick: () => void;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "all 0.3s ease-out",
    "&:active": {
        transform: "scale(0.995)",
        transition: "all 0.2s ease-in",
    },
    // Optional: you might want to add hover state
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const AnimatedTableRow: React.FC<AnimatedTableRowProps> = ({
    onClick,
    children,
    ...props
}) => {
    return (
        <StyledTableRow onClick={onClick} {...props}>
            {children}
        </StyledTableRow>
    );
};

export default AnimatedTableRow;
