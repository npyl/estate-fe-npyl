import { DialogContentProps, IconButton, Stack } from "@mui/material";
import { StyledDialogContent } from "../styles";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface ClearableDialogContentProps extends DialogContentProps {
	reset?: ActionCreatorWithPayload<void, string>;
}

export const ClearableDialogContent = ({
	reset,
	children,
	...props
}: ClearableDialogContentProps) => {
	const dispatch = useDispatch();

	return (
		<StyledDialogContent {...props}>
			<Stack direction={"row"} spacing={1}>
				<Stack flex={1}>{children}</Stack>
				<IconButton size="small" onClick={() => reset && dispatch(reset())}>
					<HighlightOffIcon />
				</IconButton>
			</Stack>
		</StyledDialogContent>
	);
};
