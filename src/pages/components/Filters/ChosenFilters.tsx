import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilter, getChangedFields } from "src/slices/filters";

const ChosenFilters = () => {
  const dispatch = useDispatch();
  const changedProps = useSelector(getChangedFields);

  const filterTags: Record<string, { label: string }> = {
    parentLocation: {
      label: "Περιοχή",
    },
    subLocation: {
      label: "Υποπεριοχή",
    },
    filterName: {
      label: "Όνομα φίλτρου",
    },
    code: {
      label: "Κωδικός",
    },
    minPrice: {
      label: "Ελάχιστη τιμή",
    },
    maxPrice: {
      label: "Μέγιστη τιμή",
    },
    minArea: {
      label: "Ελάχιστη έκταση",
    },
    maxArea: {
      label: "Μέγιστη έκταση",
    },
    minBedrooms: {
      label: "Ελάχιστος αριθμός υπνοδωματίων",
    },
    maxBedrooms: {
      label: "Μέγιστος αριθμός υπνοδωματίων",
    },
    minFloor: {
      label: "Ελάχιστος όροφος",
    },
    maxFloor: {
      label: "Μέγιστος όροφος",
    },
    minConstructionYear: {
      label: "Ελάχιστο έτος κατασκευής",
    },
    maxConstructionYear: {
      label: "Μέγιστο έτος κατασκευής",
    },
    heatingType: {
      label: "Τύπος θέρμανσης",
    },
    frameType: {
      label: "Τύπος κατασκευής",
    },
    furnished: {
      label: "Επιπλωμένο",
    },
    managerId: {
      label: "ID διαχειριστή",
    },
    states: {
      label: "Κατάστάση",
    },
    parentCategories: {
      label: "Κατηγορίες",
    },
    categories: {
      label: "Υποκατηγορίες",
    },
    labels: {
      label: "Ετικέτες",
    },
  };

  const pairFilterTags: Record<string, { label: string }> = {
    minMaxPrice: {
      label: "Τιμή (€)",
    },
    minMaxArea: {
      label: "Έκταση (τ.μ.)",
    },
    minMaxBedrooms: {
      label: "Υπνοδωμάτια",
    },
    minMaxFloor: {
      label: "Όροφος",
    },
    minMaxConstructionYear: {
      label: "Έτος κατασκευής",
    },
  };

  const hasMinMaxPair = (suffix: string | null): boolean => {
    if (!suffix) return false;

    const minKey = `min${suffix}`;
    const maxKey = `max${suffix}`;

    return changedProps.hasOwnProperty(minKey) && changedProps.hasOwnProperty(maxKey);
  };

  return (
    <Grid container direction="row" >
      {
        Object.keys(changedProps).map((key, index) => {
          const values = changedProps[key];
          let label = filterTags[key].label;

          if (values.length === 0) {
            return null;
          }

          const suffix = key.includes('min') || key.includes('max') ? key.slice(3) : null;

          // If we have min-max pair, make sure we ignore one of them (don't show the same chip twice)
          if (hasMinMaxPair(suffix) && key === `max${suffix}`) return <></>

          // If we have min-max pair show chip differently
          if (hasMinMaxPair(suffix)) {
            label = pairFilterTags[`minMax${suffix}`].label;
            const minValue = changedProps[`min${suffix}`];
            const maxValue = changedProps[`max${suffix}`];

            return <Chip
              key={index}
              label={
                <Stack direction="row">
                  <Typography sx={{ fontWeight: "medium", paddingRight: 1 }}>
                    {label}:
                  </Typography>
                  <Typography sx={{ textTransform: "lowercase", paddingRight: 1 }}>
                    {minValue}
                  </Typography>
                  <Typography sx={{ fontWeight: "medium", paddingRight: 1 }}>
                    -
                  </Typography>
                  <Typography sx={{ textTransform: "lowercase" }}>
                    {maxValue}
                  </Typography>
                </Stack >
              }
              onDelete={() => {
                dispatch(deleteFilter(`min${suffix}`));
                dispatch(deleteFilter(`max${suffix}`));
              }}
              sx={{ m: 0.5 }}
            />
          }
          else {
            return <Chip
              key={index}
              label={
                <Stack direction="row">
                  <Typography sx={{ fontWeight: "medium", paddingRight: 1 }}>
                    {label}:
                  </Typography>
                  <Typography sx={{ textTransform: "lowercase" }}>
                    {Array.isArray(values) ? values.join(", ") : values}
                  </Typography>
                </Stack >
              }
              onDelete={() => {
                dispatch(deleteFilter(key));
              }}
              sx={{ m: 0.5 }}
            />
          }
        })
      }
    </Grid >
  );
};

export default ChosenFilters;
