import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Label from "./Label";
import { LabelProps } from "./types";

interface EditableLabelProps extends LabelProps {
	onEdit: () => void;
}

const EditableLabel = ({
	ref,
	onEdit,
	children,
	...props
}: EditableLabelProps) => {
	return (
		<Label {...props}>
			{children}
			<IconButton size="small" onClick={onEdit} sx={{ ml: 1, mr: -1 }}>
				<EditIcon fontSize="small" />
			</IconButton>
		</Label>
	);
};

export default EditableLabel;
