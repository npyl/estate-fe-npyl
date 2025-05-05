import PriceSelect from "@/sections/Properties/(FiltersBar)/Filters/Price";
import AreaSelect from "@/sections/Properties/(FiltersBar)/Filters/Area";

import Floors from "@/sections/Properties/(FiltersBar)/CompactFilters/Floors";
import Fields from "@/sections/Properties/(FiltersBar)/CompactFilters/Fields";
import State from "@/sections/Properties/(FiltersBar)/CompactFilters/State";
import Beds from "@/sections/Properties/(FiltersBar)/CompactFilters/Beds";
import Lifestyle from "@/sections/Properties/(FiltersBar)/CompactFilters/Lifestyle";
import Integration from "@/sections/Properties/(FiltersBar)/CompactFilters/Integration";
import Stack from "@mui/material/Stack";

const Step1 = () => {
    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
                <PriceSelect />
                <AreaSelect />
            </Stack>

            <Floors />
            <Fields />
            <State />
            <Beds />
            <Lifestyle />
            <Integration />
        </Stack>
    );
};

export default Step1;
