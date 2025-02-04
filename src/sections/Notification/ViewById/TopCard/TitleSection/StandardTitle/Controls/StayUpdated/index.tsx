import useCustomerExists from "../../../../CustomerName/useCustomerExists";
import UpdateDemandsButton from "./UpdateDemands";
import CreateCustomerButton from "../CreateCustomer";

// -------------------------------------------------------------------

const StayUpdatedButtons = () => {
    const { didFound } = useCustomerExists();

    return (
        <>
            {didFound ? <UpdateDemandsButton /> : null}
            {!didFound ? <CreateCustomerButton /> : null}
        </>
    );
};

export default StayUpdatedButtons;
