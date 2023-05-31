import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilter, getChangedFields } from "src/slices/filters";

const ChosenFilters = () => {
  const dispatch = useDispatch();
  const changedProps = useSelector(getChangedFields);

  var PriceChip = null;
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
    labelIDs: {
      label: "Ετικέτες",
    },
  };

  console.log(changedProps);
  // if (
  //   Object.keys(changedProps).includes("minPrice") &&
  //   Object.keys(changedProps).includes("maxPrice")
  // ) {
  //   PriceChip = () => {
  //     return (
  //       <Chip
  //         label={
  //           <Stack direction={"row"}>
  //             <Typography
  //               sx={{
  //                 fontWeight: "medium",
  //                 paddingRight: 1,
  //               }}
  //             >
  //               From
  //             </Typography>
  //             <Typography
  //               sx={{
  //                 textTransform: "lowercase",
  //                 paddingRight: 1,
  //               }}
  //             >
  //               {changedProps["minPrice"]}
  //             </Typography>
  //             <Typography
  //               sx={{
  //                 fontWeight: "medium",
  //                 paddingRight: 1,
  //               }}
  //             >
  //               to
  //             </Typography>
  //             <Typography
  //               sx={{
  //                 textTransform: "lowercase",
  //               }}
  //             >
  //               {changedProps["maxPrice"]} €
  //             </Typography>
  //           </Stack>
  //         }
  //         onDelete={() => {
  //           dispatch(deleteFilter("minPrice"));
  //           dispatch(deleteFilter("maxPrice"));
  //         }}
  //         sx={{ m: 0.5 }}
  //       />
  //     );
  //   };
  // }

  return (
    <Grid container direction={"row"}>
      {/* {PriceChip && <PriceChip />} */}
      {Object.keys(changedProps).map((key, index) => {
        // ignore minPrice and maxPrice; we create a chip that contains both as one
        // if (key === "minPrice" || key === "maxPrice") return <></>;
        if (changedProps[key].length === 0) {
          return null;
        }
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
                  {filterTags[key].label}:
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
    </Grid>
  );
};

export default ChosenFilters;
