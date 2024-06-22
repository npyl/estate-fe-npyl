import Paper, { PaperProps } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const FiltersBar: React.FC<PaperProps> = (props) => (
    <Paper {...props} component={Stack} p={1} />
);

export default FiltersBar;
