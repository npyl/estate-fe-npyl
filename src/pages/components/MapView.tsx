import { Button, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import Map from "src/components/Map/Map";
import { BookingItem } from "./MediaCard";
import { IPropertyResultResponse } from "src/types/properties";
import { useRouter } from "next/router";
import Iconify from "src/components/iconify";
import ICarouselImage from "src/components/carousel/types";
import CarouselSimple from "src/components/CarouselSimple";
import FlipIcon from "@mui/icons-material/Flip";

interface Props {
	data: IPropertyResultResponse[];
}

const MapView = ({ data }: Props) => {
	const [activeMarker, setActiveMarker] = useState(null);
	const [orientation, setOrientation] = useState(false); // true -> vertical, false -> horizontal)

	const locations = useMemo(() => {
		return data.map((property) => property.location);
	}, [data]);

	const toggleOrientation = () => {
		setOrientation(!orientation);
	};

	return (
		<>
			<Box display={"flex"}>
				<Box height={`calc(100vh - 266px)`} width={"50%"}>
					<Map
						activeMarker={activeMarker}
						setActiveMarker={setActiveMarker}
						data={locations}
					/>
				</Box>

				<Stack
					height={`calc(100vh - 282px)`}
					sx={{ overflowY: "auto" }}
					marginY={1}
					spacing={1}
					width={"50%"}
				>
					<Stack direction={"row"}>
						<Box flex={1}></Box>
						<Button
							onClick={toggleOrientation}
							sx={{ width: 30, justifyContent: "right" }}
						>
							<FlipIcon />
						</Button>
					</Stack>

					<Grid container>
						{data.map((item, index) => (
							<Grid mb={1} key={index} item xs={12} sm={orientation ? 12 : 6}>
								{orientation ? (
									<HorizontalCard
										activeMarker={activeMarker || -1}
										item={item}
									/>
								) : (
									<BookingItem activeMarker={activeMarker || -1} item={item} />
								)}
							</Grid>
						))}
					</Grid>
				</Stack>
			</Box>
		</>
	);
};
export default MapView;

type BookingItemProps = {
	item: IPropertyResultResponse;
	activeMarker?: number;
};

export function HorizontalCard({ item, activeMarker }: BookingItemProps) {
	const {
		plotArea,
		parentCategory,
		description,
		details,
		price,
		location,
		images,
		id,
		area,
	} = item;

	const pricePerSqm = price / area;

	const router = useRouter();

	const _carouselImages: ICarouselImage[] = useMemo(() => {
		return images && images.length > 0
			? images.map((image, index) => ({
					id: `${index}`,
					title: "Image",
					image: image,
					description: "",
					path: "/repository",
			  }))
			: [];
	}, [images]);

	return (
		<Grid
			component={Paper}
			sx={{
				mt: 2,
				mx: 1.5,
				border: 0,
				borderRadius: 1,
				boxShadow:
					item.id === activeMarker
						? `rgba(0, 0, 0, 0.65) 0px 5px 15px`
						: `rgba(0, 0, 0, 0.25) 0px 5px 15px`,

				"&:hover": {
					cursor: "pointer",
					boxShadow: `rgba(0, 0, 0, 0.65) 0px 5px 15px`,
				},
			}}
			container
			direction={"row"}
		>
			<Grid xs={4} sx={{ position: "relative" }}>
				<CarouselSimple
					ratio="1/1"
					onImageClick={() => router.push(`property/${id}`)}
					data={_carouselImages}
				/>
			</Grid>
			<Grid
				xs={8}
				sx={{ p: 2, background: "white" }}
				onClick={() => router.push(`property/${id}`)}
			>
				<Stack
					direction="row"
					justifyContent="flex-start"
					alignItems={"center"}
					spacing={1}
				>
					<Typography variant="h5" width={"100%"}>
						{parentCategory}
					</Typography>

					<Stack direction={"row"} spacing={1}>
						<Typography variant="body1">{area}sqm</Typography>
					</Stack>
				</Stack>

				<Typography color={"text.secondary"} variant="body1" mb={2}>
					{location?.street} {location?.number}, {location?.zipCode}
				</Typography>

				<Stack
					direction="row"
					justifyContent="flex-start"
					alignItems={"center"}
					spacing={1}
					mb={3}
				>
					<Typography variant="body2">{description}</Typography>
				</Stack>

				<Stack
					direction="row"
					justifyContent="flex-start"
					alignItems={"center"}
					spacing={5}
					mb={2}
				>
					<Stack direction={"row"} spacing={1}>
						<Iconify icon={"ph:bed"} />
						<Typography variant="body2">{details?.floor}</Typography>
					</Stack>

					<Stack direction={"row"} spacing={1}>
						<Iconify icon={"ph:bed"} />
						<Typography variant="body2">{details?.bedrooms}</Typography>
					</Stack>

					<Stack direction={"row"} spacing={1}>
						<Iconify icon={"mdi:bathroom"} />
						<Typography variant="body2">{details?.bathrooms}</Typography>
					</Stack>

					{parentCategory === "Land" && (
						<Stack direction={"row"} spacing={1}>
							<Typography variant="body1">Οικόπεδο: </Typography>
							<Typography variant="body1">{plotArea} sqm</Typography>
						</Stack>
					)}
				</Stack>

				<Stack direction={"row"} spacing={5}>
					<Typography variant="h6">{price}€</Typography>
					<Typography variant="h6">
						{Number.isInteger(pricePerSqm)
							? pricePerSqm
							: pricePerSqm.toFixed(1)}
						€/sqm
					</Typography>
				</Stack>
			</Grid>
		</Grid>
	);
}
