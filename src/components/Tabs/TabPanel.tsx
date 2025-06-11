import Stack, { StackProps } from "@mui/material/Stack";

interface TabPanelProps extends StackProps {
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { value, index, ...other } = props;
    if (value !== index) return null;
    return <Stack height={1} gap={1} {...other} />;
}
