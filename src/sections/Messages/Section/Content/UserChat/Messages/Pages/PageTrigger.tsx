import Stack, { StackProps } from "@mui/material/Stack";
import { HEAD_HEIGHT } from "../../../../constants";
import { FC, useLayoutEffect, useRef } from "react";

interface PageTriggerProps extends Omit<StackProps, "children"> {
    onScrollReach: VoidFunction;
}

const PageTrigger: FC<PageTriggerProps> = ({ onScrollReach, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                if (entry.isIntersecting) {
                    onScrollReach();
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (!ref.current) return;
        observer.observe(ref.current);

        return () => {
            if (!ref.current) return;
            observer.unobserve(ref.current);
        };
    }, []);

    return (
        <Stack
            ref={ref}
            height={HEAD_HEIGHT}
            minHeight={HEAD_HEIGHT}
            width={1}
            justifyContent="center"
            alignItems="center"
            {...props}
        />
    );
};

export default PageTrigger;
