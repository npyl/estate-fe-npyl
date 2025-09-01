import { Box } from "@mui/material";
import { forwardRef } from "react";
import ManagerAutocomplete, {
    ManagerAutocompleteProps,
} from "@/ui/Autocompletes/Manager";
import AssignToMe from "./AssignToMe";

// -------------------------------------------------------------------------

interface AssigneeAutocompleteProps extends ManagerAutocompleteProps {
    label: string;
    error?: boolean;
    helperText?: string;
    // ...
    assignToMe?: boolean;
}

const AssigneeAutocomplete = forwardRef<
    HTMLDivElement,
    AssigneeAutocompleteProps
>(({ label, error = false, helperText, assignToMe = false, ...props }, ref) => (
    <Box>
        <ManagerAutocomplete ref={ref as any} {...props} />
        {assignToMe ? <AssignToMe onAssign={props.onChange} /> : null}
    </Box>
));

AssigneeAutocomplete.displayName = "AssigneeAutocomplete";

export default AssigneeAutocomplete;
