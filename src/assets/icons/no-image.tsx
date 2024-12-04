import { useTheme } from "@mui/material";
import { forwardRef, SVGAttributes } from "react";

const NoImageIcon = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
    (props, ref) => {
        const {
            palette: { neutral, mode },
        } = useTheme();

        const fill = mode === "light" ? neutral?.[400] : neutral?.[600];

        return (
            <svg
                ref={ref}
                width={16}
                height={16}
                viewBox="0 0 16 16"
                {...props}
            >
                {/* Main icon shape with smoother curves */}
                <path
                    fill={fill}
                    d="M5.219 3.333c-.133-.133-.533-.533-.667-.667-.133-.133 0 0 0 0h10.114v10.115l-.666-.667v-.46l-2.078-2.078c-.088.066-.176.131-.263.197l-.476-.476c.19-.142.38-.285.57-.427a.335.335 0 0 1 .437.031L14 10.711V3.333H5.219zM2 13.333v-.346l1.965-1.965c.129.073.285.109.451.109.257 0 .496-.1.665-.277l1.944-1.944-.471-.471-1.944 1.944a.316.316 0 0 1-.452-.032.335.335 0 0 0-.469.005L2 12.045V3.885c-.133-.133-.533-.533-.667-.667v10.115h10.781l-.666-.667H2z"
                />
                {/* Camera lens - using arc commands for perfect circle */}
                <path
                    fill={fill}
                    d="M10.333 4.667a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 1.333a.333.333 0 1 1 0-.666.333.333 0 0 1 0 .666z"
                />
                {/* Diagonal strike-through line with rounded caps */}
                <path
                    fill={fill}
                    d="M15.097 14.903a.333.333 0 0 1-.471.471l-13.333-13.333a.333.333 0 0 1 .471-.471l13.333 13.333z"
                />
                <path fill="none" d="M0 0h16v16H0z" />
            </svg>
        );
    }
);

export default NoImageIcon;
