"use client";
import {
  Box,
  BoxProps,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Iconify from "src/components/iconify";
import { IProperties } from "src/types/properties";
import Image from "../../components/image";
import Label from "../../components/label";
// utils

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
    <Grid container sx={{ px: 1.5, pb: 2, ...sx }}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={4} md={3}>
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
  const { state, propertyDetail, price, location, propertyImage, id } = item;
  console.log(item.id, activeMarker);
  const router = useRouter();
  return (
    <Paper
      onClick={() => router.push(`property/${id}`)}
      sx={{
        mx: 1.5,
        borderRadius: 1,
        boxShadow:
          item.id === activeMarker
            ? `rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`
            : ` rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;`,
        bgcolor: "neutral.100",
        "&:hover": {
          cursor: "pointer",
          boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`,
        },
      }}
    >
      <Box sx={{ p: 1, position: "relative" }}>
        <Label
          variant="filled"
          color={
            (state === "SOLD" && "error") ||
            (state === "SALE" && "info") ||
            "warning"
          }
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 16,
            position: "absolute",
          }}
        >
          {state}
        </Label>

        <Image
          alt="cover"
          src={`data:image/jpeg;base64,${propertyImage!}`}
          ratio="16/9"
          sx={{ borderRadius: 1.5 }}
        />
      </Box>

      <Stack direction="column" spacing={0.5} sx={{ p: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">Τιμή:</Typography>
          <Typography variant="body1">{price}€</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1"> Εμβαδόν:</Typography>
          <Typography variant="body1">
            {" "}
            {propertyDetail.propertyArea}τ.μ
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Iconify icon="material-symbols:map" width={16} />
          <Typography variant="body1">
            {" "}
            {location.street}({location.region}), {location.city}{" "}
            {location.country}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
