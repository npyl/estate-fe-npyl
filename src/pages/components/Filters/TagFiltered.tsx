import { useSelector, useDispatch } from "react-redux";
import { getChangedFields, deleteFilter } from "src/slices/filters";
import { Stack, Chip, Typography, InputAdornment } from "@mui/material";

const TagFiltered = () => {
  const dispatch = useDispatch();
  const changedProps = useSelector(getChangedFields);

  var PriceChip = null;

  if (
    Object.keys(changedProps).includes("minPrice") &&
    Object.keys(changedProps).includes("maxPrice")
  ) {
    PriceChip = () => {
      return (
        <Chip
          label={
            <Stack direction={"row"}>
              <Typography
                sx={{
                  fontWeight: "medium",
                  paddingRight: 1,
                }}
              >
                From
              </Typography>
              <Typography
                sx={{
                  textTransform: "lowercase",
                  paddingRight: 1,
                }}
              >
                {changedProps["minPrice"]}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  paddingRight: 1,
                }}
              >
                to
              </Typography>
              <Typography
                sx={{
                  textTransform: "lowercase",
                }}
              >
                {changedProps["maxPrice"]} €
              </Typography>
            </Stack>
          }
          onDelete={() => {
            dispatch(deleteFilter("minPrice"));
            dispatch(deleteFilter("maxPrice"));
          }}
          sx={{ m: 0.5 }}
        />
      );
    };
  }

  return (
    <Stack direction={"row"}>
      {PriceChip && <PriceChip />}
      {Object.keys(changedProps).map((key, index) => {
        // ignore minPrice and maxPrice; we create a chip that contains both as one
        if (key === "minPrice" || key === "maxPrice") return <></>;

        return (
          <Chip
            key={index}
            label={
              <Stack direction={"row"}>
                <Typography
                  sx={{
                    fontWeight: "medium",
                    paddingRight: 1,
                  }}
                >
                  {key}:
                </Typography>
                <Typography
                  sx={{
                    textTransform: "lowercase",
                  }}
                >
                  {Array.isArray(changedProps[key])
                    ? changedProps[key]
                        .map((element: string) => element)
                        .join(", ")
                    : changedProps[key]}
                </Typography>
              </Stack>
            }
            onDelete={() => {
              dispatch(deleteFilter(key));
            }}
            sx={{ m: 0.5 }}
          />
        );
      })}
    </Stack>
  );
};

export default TagFiltered;
