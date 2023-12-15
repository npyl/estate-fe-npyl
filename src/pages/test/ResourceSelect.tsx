import { Button, ButtonGroup } from "@mui/material";
import { LabelResourceType } from "src/types/label";

interface ResourceSelectProps {
    resource: LabelResourceType;
    setResource: (type: LabelResourceType) => void;
}

const ResourceSelect = ({ resource, setResource }: ResourceSelectProps) => {
    return (
        <ButtonGroup
            variant="outlined"
            fullWidth
            sx={{
                mt: 5,
                px: 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Button
                variant={resource === "property" ? "contained" : "outlined"}
                onClick={() => setResource("property")}
            >
                Properties
            </Button>
            <Button
                variant={resource === "customer" ? "contained" : "outlined"}
                onClick={() => setResource("customer")}
            >
                Customers
            </Button>
            <Button
                variant={resource === "document" ? "contained" : "outlined"}
                onClick={() => setResource("document")}
            >
                Documents
            </Button>
        </ButtonGroup>
    );
};

export default ResourceSelect;
