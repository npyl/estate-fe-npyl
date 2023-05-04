"use client";
import { Box, BoxProps, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Iconify from "src/components/iconify/Iconify";
import { IProperties } from "src/types/properties";
import CarouselSimple from "src/components/CarouselSimple";
import Label from "../../components/label";

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;

  bookdAt: Date | string | number;
  roomNumber: string;
  person: string;
  roomType: string;
  cover: string;
};

interface Props extends BoxProps {
  title?: string;
  subheader?: string;
  data: IProperties[];
}

export default function MediaCard({ data, sx, ...other }: Props) {
  return (
    <Grid container sx={{ pb: 2, ...sx }}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={4}>
          <BookingItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

// ----------------------------------------------------------------------

type BookingItemProps = {
  item: IProperties;
  activeMarker?: number;
};

export function BookingItem({ item, activeMarker }: BookingItemProps) {
  const { state, propertyDetail, price, location, propertyImage, images, id } =
    item;

  const router = useRouter();

  if (
    !state ||
    !propertyDetail ||
    !price ||
    !location ||
    !propertyImage ||
    !images ||
    !id
  )
    return null;

  interface ICarouselImage {
    id: string;
    title: string;
    image: string;
    description: string;
    path: string;
  }

  const _carouselImages: ICarouselImage[] = [
    {
      id: "0",
      title: "Image",
      image: `data:image/jpeg;base64,${propertyImage}`,
      description: "One of the images",
      path: "/repository",
    },
  ];

  // add all images
  images.forEach((image, index) => {
    _carouselImages.push({
      id: (index + 1).toString(),
      title: "Image",
      image: `data:image/jpeg;base64,${image.data}`,
      description: "One of the images",
      path: "/repository",
    });
  });

  return (
    _carouselImages &&
    _carouselImages.length > 0 && (
      <Paper
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
      >
        <Box sx={{ position: "relative" }}>
          <Label
            variant="filled"
            color={
              (state === "SOLD" && "error") ||
              (state === "SALE" && "info") ||
              "warning"
            }
            sx={{
              left: 16,
              zIndex: 9,
              bottom: 16,
              position: "absolute",
            }}
          >
            {state}
          </Label>

          <CarouselSimple
            onImageClick={() => router.push(`property/${id}`)}
            data={_carouselImages}
          />
        </Box>

        <Stack
          direction="column"
          spacing={1}
          sx={{ p: 2, background: "white" }}
          onClick={() => router.push(`property/${id}`)}
        >
          <Typography variant="h6">{price}€</Typography>

          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems={"center"}
            spacing={1}
          >
            <Iconify icon={"solar:ruler-angular-linear"} />
            <Typography variant="body2">
              {propertyDetail.propertyArea}sqm -
            </Typography>
            <Iconify icon={"ph:bed"} />
            <Typography variant="body2">{propertyDetail.bedrooms} -</Typography>
            <Iconify icon={"mdi:bathroom"} />
            <Typography variant="body2">{propertyDetail.bathrooms}</Typography>
          </Stack>

          <Typography color={"text.secondary"} variant="body1">
            {location.street} {location.number}, {location.zipCode}
          </Typography>
        </Stack>
      </Paper>
    )
  );
}
