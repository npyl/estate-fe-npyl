// @mui
import { Box, BoxProps, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { IProperties } from "src/types/properties";
import Image from "../image";
import Label from "../label";
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
    <Grid container sx={{ py: 2, ...sx }}>
      {data.map((item, index) => (
        <Grid item key={index} xs={3}>
          <BookingItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

// ----------------------------------------------------------------------

type BookingItemProps = {
  item: IProperties;
};

function BookingItem({ item }: BookingItemProps) {
  const {
    state,
    category,
    type,
    price,
    area,
    available_after,
    has_key,
    description,
    propertyImage,
  } = item;
  const router = useRouter();
  return (
    <Paper
      onClick={() => router.push(`property/item.id`)}
      sx={{
        mx: 1.5,
        borderRadius: 2,
        bgcolor: "background.neutral",
        "&:hover": { cursor: "pointer" },
      }}
    >
      <Box sx={{ p: 1, position: "relative" }}>
        <Label
          variant='filled'
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
          alt='cover'
          src={`data:image/jpeg;base64,${propertyImage!}`}
          ratio='16/9'
          sx={{ borderRadius: 1.5 }}
        />
      </Box>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <div>
            <Typography
              variant='caption'
              sx={{ color: "text.disabled", mt: 0.5, display: "block" }}
            >
              {description}
              {/* {fDateTime(bookdAt)} */}
            </Typography>
          </div>
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          spacing={3}
          sx={{ color: "text.secondary" }}
        >
          <Stack direction='row' alignItems='center' spacing={1}>
            {/* <Iconify icon='ic:round-vpn-key' width={16} /> */}
            <Typography variant='caption'>Price {price}</Typography>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={1}></Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
