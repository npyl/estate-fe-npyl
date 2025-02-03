import { HideText } from "@/components/styled";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import {
    ICustomerFromStayUpdatedReq,
    useCreateOrUpdateCustomerFromStayUpdatedMutation,
} from "@/services/customers";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { demandMapper } from "@/mappers/demand";
import successToast from "@/components/Toaster/success";

const CreateCustomerButton = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { rowId } = router.query;

    const { data } = useGetNotificationByIdQuery(+rowId!);
    const { firstName, lastName, mobilePhone, email, customerDemand } =
        data?.stayUpdatedDetails || {};

    const [cou, { isLoading }] =
        useCreateOrUpdateCustomerFromStayUpdatedMutation();

    const handleCreate = async () => {
        try {
            // INFO: this should not happen!
            if (!firstName || !lastName || !mobilePhone || !email) return;

            const body: ICustomerFromStayUpdatedReq = {
                firstName,
                lastName,
                mobilePhone,
                email,
                demands: customerDemand ? [demandMapper(customerDemand)] : [],
            };

            await cou({
                notificationId: +rowId!,
                body,
            });

            successToast("Success");
        } catch (ex) {}
    };

    return (
        <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            sx={{
                textWrap: "nowrap",
                ...HideText,
            }}
            color="info"
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={handleCreate}
        >
            {t("Create Customer")}
        </LoadingButton>
    );
};

// -------------------------------------------------------------------

const StayUpdatedButtons = () => <CreateCustomerButton />;
export default StayUpdatedButtons;
