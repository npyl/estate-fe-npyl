import FiltersBar from "./FiltersBar";
import { AgreementsFiltersProvider } from "./FiltersBar/FiltersContext";
import Stack from "@mui/material/Stack";
import CardsContent from "./Content";
import { FC } from "react";
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import CreateButton from "./CreateButton";
const PreparationDialog = dynamic(() => import("./Dialogs/Preparation"));

// --------------------------------------------------------------------------------

interface CreateAgreementProps {
    create?: boolean;
}

const CreateAgreement: FC<CreateAgreementProps> = ({ create = false }) => {
    const [isOpen, _, closeDialog] = useDialog(create);

    if (!isOpen) return null;

    return <PreparationDialog onClose={closeDialog} />;
};

// --------------------------------------------------------------------------------

interface Props {
    create?: boolean;

    // Are we on a property/[propertyId] page or the agreements page?
    propertyId?: number;
    customerId?: number;
}

const AgreementsSection: React.FC<Props> = ({
    create = false,
    propertyId,
    customerId,
}) => (
    <>
        <AgreementsFiltersProvider>
            <Stack spacing={1}>
                <FiltersBar customer={!!customerId} />

                <CardsContent propertyId={propertyId} customerId={customerId} />
            </Stack>
        </AgreementsFiltersProvider>

        <CreateButton />

        <CreateAgreement create={create} />
    </>
);

export default AgreementsSection;
