import Box from "@mui/material/Box";
import Actions from "./Actions";
import Content from "./Content";
import Form from "./Form";
import Title from "./Title";
import { FC } from "react";
import Dialog from "@/components/Dialog";
import styled from "@emotion/styled";
import { DialogContent } from "@mui/material";
import isFalsy from "@/utils/isFalsy";

const StyledDialogContent = styled(DialogContent)({
    padding: 0,
});

interface CreateOrEditProps {
    roleId?: number;
    onCancel: VoidFunction;
    onClose: VoidFunction;
}

const CreateOrEdit: FC<CreateOrEditProps> = ({ roleId, onCancel, onClose }) => (
    <Form roleId={roleId}>
        <Dialog
            onClose={onCancel}
            hideTitle
            DialogContentComponent={StyledDialogContent}
            content={
                <Box p={2}>
                    <Title />
                    <Box mt={3} />
                    <Content />
                </Box>
            }
            actions={
                <Actions
                    isCreate={isFalsy(roleId)}
                    onCancel={onCancel}
                    onClose={onClose}
                />
            }
        />
    </Form>
);

export default CreateOrEdit;
