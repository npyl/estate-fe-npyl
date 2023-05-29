import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import sumOfChangedProperties, { resetState } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import ChosenFilters from "./ChosenFilters";
import CategorySelect from "./FilterCategory";
import CountrySelect from "./FilterCities";
import FilterLabels from "./FilterLabels";
import FilterMore from "./FilterMore";
import PriceSelect from "./FilterPrice";
import SaleSelect from "./FilterSale";
import SubAreas from "./FilterSubAreas";
import SubCategorySelect from "./FilterSubCategory";
import { StyledPriceButton } from "./styles";

export function FilterSection() {
  const dispatch = useDispatch();
  const changedPropsCount = useSelector(sumOfChangedProperties);
  const [openFilter, setOpenFilter] = useState(false);
  const handleResetFilter = () => {
    dispatch(resetState());
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleApplyFilter = () => {
    // setFilter(changedProps);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <Stack
      spacing={3}
      component={Paper}
      sx={{ paddingX: 2, paddingTop: 2, paddingBottom: 1 }}
    >
      <Typography color={"text.secondary"} variant='h5'>
        Φίλτρα
      </Typography>
      <Grid container direction={"row"} gap={1}>
        <CountrySelect />
        <SubAreas />
        <SaleSelect />

        <CategorySelect />
        <SubCategorySelect />

        <PriceSelect type={"price"} />
        <PriceSelect type={"area"} />
        <FilterLabels />
        <StyledPriceButton
          open={false}
          disableRipple
          color='inherit'
          sx={{ width: 120 }}
          endIcon={
            <Badge badgeContent={changedPropsCount} color='error'>
              <TuneIcon />
            </Badge>
          }
          onClick={handleOpenFilter}
        >
          Έξτρα
        </StyledPriceButton>
      </Grid>

      <ChosenFilters />

      {openFilter && (
        <FilterMore
          open={openFilter}
          onOpen={handleOpenFilter}
          onApply={handleApplyFilter}
          onClose={handleCloseFilter}
          onResetFilter={handleResetFilter}
        />
      )}
    </Stack>
  );
}
