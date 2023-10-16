// AnimatedTableRow.tsx
import React from "react";
import { MotionProps, motion } from "framer-motion";

const AnimatedTableRow: React.FC<MotionProps> = ({ children, ...props }) => {
    const variants = {
        initial: {
            backgroundColor: "transparent",
            transition: { duration: 0.3, ease: "easeOut" },
        },
        hover: {
            backgroundColor: "#f0f0f0",
            transition: { duration: 0.8, ease: "easeIn" },
        },
        pressed: {
            scale: 0.995,
            transition: { duration: 0.2, ease: "easeIn" },
        },
    };

    return (
        <motion.tr
            whileHover="hover"
            whileTap="pressed"
            variants={variants}
            {...props}
        >
            {children}
        </motion.tr>
    );
};

export default AnimatedTableRow;
