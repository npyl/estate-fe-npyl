import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilter, getChangedFields, selectIds } from "src/slices/filters";

const ChosenFilters = () => {
  const dispatch = useDispatch();
  const changedProps = useSelector(getChangedFields);
  const ids = useSelector(selectIds);
  const filterTags: Record<string, { label: string }> = {
    parentLocation: {
      label: "Location",
    },
    subLocation: {
      label: "SubLocation",
    },
    filterName: {
      label: "Filter Name",
    },
    code: {
      label: "Code",
    },
    minPrice: {
      label: "Minimum Price",
    },
    maxPrice: {
      label: "Maximun Price",
    },
    minArea: {
      label: "Minimum Area",
    },
    maxArea: {
      label: "Maximun Area",
    },
    minBedrooms: {
      label: "Minimun Number of Bedrooms",
    },
    maxBedrooms: {
      label: "Maximun Number of Bedrooms",
    },
    minFloor: {
      label: "Minimum Floor",
    },
    maxFloor: {
      label: "Maximun Floor",
    },
    minConstructionYear: {
      label: "Minimun Constuction Year",
    },
    maxConstructionYear: {
      label: "Maximun Construction Year",
    },
    heatingType: {
      label: "Heating Type",
    },
    frameType: {
      label: "Frame Type",
    },
    furnished: {
      label: "Furnished",
    },
    managerId: {
      label: "Manager ID",
    },
    states: {
      label: "State",
    },
    parentCategories: {
      label: "Category",
    },
    categories: {
      label: "Subcategory",
    },
    labels: {
      label: "Labels",
    },
  };

  const pairFilterTags: Record<string, { label: string }> = {
    minMaxPrice: {
      label: "Price (€)",
    },
    minMaxArea: {
      label: "Area (τ.μ.)",
    },
    minMaxBedrooms: {
      label: "Bedrooms",
    },
    minMaxFloor: {
      label: "Floor",
    },
    minMaxConstructionYear: {
      label: "Construction Year",
    },
  };

  const hasMinMaxPair = (suffix: string | null): boolean => {
    if (!suffix) return false;

    const minKey = `min${suffix}`;
    const maxKey = `max${suffix}`;

    return (
      changedProps.hasOwnProperty(minKey) && changedProps.hasOwnProperty(maxKey)
    );
  };

  return (
    <Grid container direction="row">
      {ids.map((key, index) => {
        const values = changedProps[key];
        console.log(key);
        let label = filterTags[key].label;

        if (values.length === 0) {
          return null;
        }
        const suffix =
          key.includes("min") || key.includes("max") ? key.slice(3) : null;
        // If we have min-max pair, make sure we ignore one of them (don't show the same chip twice)
        if (hasMinMaxPair(suffix) && key === `max${suffix}`) return <></>;

        // If we have min-max pair show chip differently
        if (hasMinMaxPair(suffix)) {
          label = pairFilterTags[`minMax${suffix}`].label;
          const minValue = changedProps[`min${suffix}`];
          const maxValue = changedProps[`max${suffix}`];

          return (
            <Chip
              key={index}
              label={
                <Stack direction="row">
                  <Typography sx={{ fontWeight: "medium", paddingRight: 1 }}>
                    {label}:
                  </Typography>
                  <Typography
                    sx={{ textTransform: "lowercase", paddingRight: 1 }}
                  >
                    {minValue}
                  </Typography>
                  <Typography sx={{ fontWeight: "medium", paddingRight: 1 }}>
                    -
                  </Typography>
                  <Typography sx={{ textTransform: "lowercase" }}>
                    {maxValue}
                  </Typography>
                </Stack>
              }
              onDelete={() => {
                dispatch(deleteFilter(`min${suffix}`));
                dispatch(deleteFilter(`max${suffix}`));
              }}
              sx={{ m: 0.5 }}
            />
          );
        } else {
          return (
            <Chip
              key={index}
              label={
                <Stack direction="row">
                  <Typography sx={{ fontWeight: "medium", paddingRight: 1 }}>
                    {label}:
                  </Typography>
                  <Typography sx={{ textTransform: "lowercase" }}>
                    {Array.isArray(values) ? values.join(", ") : values}
                  </Typography>
                </Stack>
              }
              onDelete={() => {
                dispatch(deleteFilter(key));
              }}
              sx={{ m: 0.5 }}
            />
          );
        }
      })}
    </Grid>
  );
};

export default ChosenFilters;
