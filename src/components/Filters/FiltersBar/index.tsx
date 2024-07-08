import Paper, { PaperProps } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const FiltersBar: React.FC<PaperProps> = (props) => (
    <Paper
        {...props}
        component={Stack}
        p={1}
        // NOTE: paddingTop must come from the components so that the label that shrinks on top is visible
        pt={0}
    />
);

export default FiltersBar;
