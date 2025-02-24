import { Typography, Stack, StackProps } from "@mui/material";
import { FC } from "react";

interface SectionProps extends StackProps {
    title: string;
}

const Section: FC<SectionProps> = ({ title, children, ...props }) => (
    <Stack width={1} spacing={1} {...props}>
        <Typography variant="h6" fontWeight="400">
            {title}
        </Typography>
        <Stack width={1} spacing={0.5}>
            {children}
        </Stack>
    </Stack>
);

export default Section;
