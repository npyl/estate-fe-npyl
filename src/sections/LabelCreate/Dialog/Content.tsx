import { Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Label from "@/components/Label/Label";
import { ILabel } from "src/types/label";
import CreateButton from "./CreateButton";
import Preview from "@/sections/Label/Create/Preview";
import RHFColorPicker from "@/sections/Label/Create/RHFColorPicker";

interface ContentProps {
    existingLabels: ILabel[];
    assignedLabels: ILabel[];
    onLabelClick: (l: ILabel) => void;
}

const Content: FC<ContentProps> = ({
    existingLabels,
    assignedLabels,
    onLabelClick,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={1}>
                {existingLabels.map((label, index) => {
                    const isAssigned = assignedLabels.some(
                        (assignedLabel) => assignedLabel.name === label.name
                    );

                    return (
                        <Label
                            key={index}
                            color={label.color}
                            name={label.name}
                            onClick={
                                isAssigned
                                    ? undefined
                                    : () => onLabelClick(label)
                            }
                            opacity={isAssigned ? 0.4 : 1} // Pass opacity directly here
                            sx={{
                                borderRadius: 7,
                                "&:hover": isAssigned
                                    ? undefined
                                    : { cursor: "pointer" },
                            }}
                        />
                    );
                })}
            </Stack>
            <Typography variant="h5" mt={2}>
                {t("Create Label")}
            </Typography>
            <Stack spacing={3} mt={1}>
                <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            fullWidth
                            label={t("Label's name")}
                            variant="outlined"
                        />
                    </Stack>

                    <RHFColorPicker />

                    <Preview />

                    <CreateButton />
                </Stack>
            </Stack>
        </>
    );
};

export default Content;
