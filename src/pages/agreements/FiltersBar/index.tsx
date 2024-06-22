import { FilterButton } from "@/components/Filters";
import FiltersBar from "@/components/Filters/FiltersBar";
import { SpaceBetween } from "@/components/styled";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import ChosenFilters from "./ChosenFilters";

interface Props {
    onClickNew: VoidFunction;
}

const AgreementsFiltersBar: React.FC<Props> = ({ onClickNew }) => {
    const { t } = useTranslation();

    return (
        <FiltersBar>
            <SpaceBetween>
                <Typography>{t("Filters")}</Typography>

                <FilterButton endIcon={<AddIcon />} onClick={onClickNew}>
                    {t("New")}
                </FilterButton>
            </SpaceBetween>

            <ChosenFilters />
        </FiltersBar>
    );
};

export default AgreementsFiltersBar;
