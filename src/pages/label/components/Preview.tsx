import { Grid, Stack, Typography, Paper } from "@mui/material";
import { Label } from "src/components/label";
import { ILabel } from "src/types/label";

export const Preview = (props: {
	labelData: Record<string, { label: string; data: ILabel[] }> | null;
	onDelete: (resource: string, labelId: number) => void;
}) => {
	const { labelData, onDelete } = props;

	return (
		<>
			<Grid component={Paper} item xs={12} sm p={2}>
				<Stack direction={"column"} spacing={3}>
					<Typography variant="h5">Προβολή υπαρχόντων</Typography>
					{labelData &&
						Object.entries(labelData).map(([_, value], index) => {
							return (
								<Grid
									key={index}
									gap={1}
									container
									flex={1}
									direction={"column"}
								>
									<Typography variant="h6" color={"text.secondary"}>
										{value.label}
									</Typography>
									<Stack direction={"row"} flexWrap={"wrap"}>
										{value.data &&
											value.data.map((label: ILabel) => (
												<Label
													key={label.id}
													variant="soft"
													sx={{
														borderRadius: 7,
														color: "white",
														bgcolor: label.color,
													}}
													onClose={() =>
														label.id && onDelete(value.label, label.id)
													}
												>
													{label.name}
												</Label>
											))}
									</Stack>
								</Grid>
							);
						})}
				</Stack>
			</Grid>
		</>
	);
};
