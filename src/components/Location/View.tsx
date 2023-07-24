import { Grid, List } from "@mui/material";
import { ListItem } from "src/components/List";
import { ILocation } from "src/types/location";

import { useMemo } from "react";

import nomoi from "src/json/nomoi.json";
import { useTranslation } from "react-i18next";

interface ViewLocationProps {
	location: ILocation;
}

const isNumberString = (input: string): boolean => !isNaN(Number(input));

export const ViewLocation = ({ location }: ViewLocationProps) => {
	const { t } = useTranslation();

	// region is most of the types a code; translate to human readable form; otherwise just return the string
	const region = useMemo(() => {
		if (!location?.region) return "";

		return isNumberString(location.region)
			? nomoi.filter((o) => o["Area ID"] === location.region)[0]["Name GR"]
			: location.region;
	}, [location?.region]);

	// city is most of the types a code; translate to human readable form; otherwise just return the string
	const city = useMemo(() => {
		if (!location?.city) return "";

		return isNumberString(location.city)
			? nomoi.filter((o) => o["Area ID"] === location.city)[0]["Name GR"]
			: location.city;
	}, [location?.city]);

	return (
		<>
			<Grid container>
				<Grid item xs={6} padding={0}>
					<List>
						<ListItem
							label={t("Street")}
							value={location?.street}
							align="horizontal"
						/>

						<ListItem
							label={t("Number")}
							value={location?.number}
							align="horizontal"
						/>

						<ListItem label={t("City")} value={city} align="horizontal" />
					</List>
				</Grid>

				<Grid item xs={6} padding={0}>
					<List>
						<ListItem
							label={t("Zip Code")}
							value={location?.zipCode}
							align="horizontal"
						/>
						<ListItem label={t("Region")} value={region} align="horizontal" />
						<ListItem
							label={t("Country")}
							value={location?.country}
							align="horizontal"
						/>
					</List>
				</Grid>
			</Grid>
		</>
	);
};
