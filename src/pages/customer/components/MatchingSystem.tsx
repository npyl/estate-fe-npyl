import { Checkbox, FormLabel, Stack, Typography } from "@mui/material";

import * as React from "react";
import { useTranslation } from "react-i18next";

const MatchingSystem: React.FC<any> = (props) => {
	const { t } = useTranslation();

	return (
		<Stack
			paddingTop={1}
			direction={"row"}
			alignItems={"center"}
			paddingLeft={1}
		>
			<Checkbox
				checked={false}
				onChange={() => {}}
				inputProps={{ "aria-label": "controlled" }}
			/>

			<FormLabel id="demo-controlled-radio-buttons-group">
				<Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
					{t("Matching System Enabled")}
				</Typography>
			</FormLabel>
		</Stack>
	);
};
export default MatchingSystem;
