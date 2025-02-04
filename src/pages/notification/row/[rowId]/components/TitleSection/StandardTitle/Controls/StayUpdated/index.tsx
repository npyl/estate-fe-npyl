import useCustomerExists from "../../../../../CustomerName/useCustomerExists";
import { FC } from "react";
import UpdateDemandsButton from "./UpdateDemands";
import CreateCustomerButton from "../CreateCustomer";

// -------------------------------------------------------------------

interface Props {
    email: string;
}

const StayUpdatedButtons: FC<Props> = ({ email }) => {
    const { didFound } = useCustomerExists(email);

    return (
        <>
            {didFound ? <UpdateDemandsButton /> : null}
            {!didFound ? <CreateCustomerButton data={{} as any} /> : null}
        </>
    );
};

export default StayUpdatedButtons;
