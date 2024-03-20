// AnimatedTableRow.tsx
import { MotionProps, motion } from "framer-motion";
import React from "react";

interface AnimatedTableRowProps extends MotionProps {
    onClick: () => void;
}

const variants = {
    initial: {
        backgroundColor: "transparent",
        transition: { duration: 0.3, ease: "easeOut" },
    },

    pressed: {
        scale: 0.995,
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

const AnimatedTableRow: React.FC<AnimatedTableRowProps> = ({
    onClick,
    children,
    ...props
}) => {
    return (
        <motion.tr
            whileTap="pressed"
            variants={variants}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.tr>
    );
};

export default AnimatedTableRow;
