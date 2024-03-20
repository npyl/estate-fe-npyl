import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import {
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSecurityContext } from "src/contexts/security";
import {
    useDeletePresetMutation,
    useGetPresetsQuery,
    useSavePresetMutation,
    useSaveRelationshipMutation,
} from "src/services/security";
import { useAllUsersQuery, useDeleteUserMutation } from "src/services/user";
import SavePresetDialog from "../PresetModal";
import PermissionsTable from "./PermissionsTable";

const PermissionPage: FC = () => {
    const [openPresetModal, setOpenPresetModal] = useState<boolean>(false);
    const { data: presets } = useGetPresetsQuery();
    const { t } = useTranslation();
    // const [savePreset] = useSavePresetMutation();
    const [saveRelationship, { isLoading }] = useSaveRelationshipMutation();
    const [savePreset] = useSavePresetMutation();
    const [deletePreset] = useDeletePresetMutation();
    const [deleteUser] = useDeleteUserMutation();
    const { data: users } = useAllUsersQuery();
    const {
        data,
        targetUser,
        setTargetUser,
        selectedPreset,
        setSelectedPreset,
        selectedUser,
        setSelectedUser,
        isDirty,
        preset,
        isFetching,
    } = useSecurityContext();

    const handleSave = (name: string) => {
        savePreset({
            data: {
                id: selectedPreset === -1 ? null : preset?.id,
                name,
                permissions: data.permissionResponses,
            },
            method: !!preset?.id && selectedPreset !== -1 ? "PUT" : "POST",
        });
        setOpenPresetModal(false);
    };
    return (
        <>
            <Box style={{ display: "flex" }} gap={2} position={"relative"}>
                {/* Left sticky box */}
                <Box
                    width="16.6%" // 1/6 of the width
                    position="sticky"
                    top={100}
                    height={"100%"}
                    paddingRight={2} // Add some padding for better appearance
                >
                    <Stack gap={2}>
                        <FormControl>
                            <Stack direction={"column"}>
                                <Box display="flex" alignItems={"center"}>
                                    <Typography
                                        sx={{ display: "flex" }}
                                        color={"neutral.400"}
                                        variant={"body2"}
                                    >
                                        {t("Source User")}:
                                    </Typography>
                                </Box>

                                <Select
                                    labelId="demo-simple-select-label"
                                    value={
                                        selectedUser !== -1 ? selectedUser : ""
                                    }
                                    onChange={(e) => {
                                        selectedPreset !== -1 &&
                                            setSelectedPreset(-1);
                                        setSelectedUser(+e.target.value);
                                    }}
                                    renderValue={(selected) => (
                                        <Typography
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {
                                                users?.find(
                                                    (e) => e.id === selected
                                                )?.username
                                            }
                                        </Typography>
                                    )}
                                >
                                    {users &&
                                        users.length > 0 &&
                                        users.map((user: any) => (
                                            <MenuItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                <Typography>
                                                    {user.username}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Stack>
                        </FormControl>
                        <Divider />
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">
                                <Typography
                                    color={"neutral.400"}
                                    variant={"body2"}
                                >
                                    {t("Target user")}:
                                </Typography>
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={targetUser}
                                onChange={(e) => {
                                    selectedPreset !== -1 &&
                                        setSelectedPreset(-1);
                                    setTargetUser(+e.target.value);
                                }}
                            >
                                {users &&
                                    users.length > 0 &&
                                    users.map((user: any) => (
                                        <FormControlLabel
                                            key={user.id}
                                            value={user.id}
                                            control={<Radio size="small" />}
                                            label={
                                                <Typography
                                                    sx={{
                                                        wordBreak: "break-all",
                                                    }}
                                                    variant="caption"
                                                >
                                                    {user.username}
                                                </Typography>
                                            }
                                        />
                                    ))}
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                        <FormControl>
                            <Stack direction={"column"}>
                                <Box display="flex" alignItems={"center"}>
                                    <Typography
                                        sx={{ display: "flex" }}
                                        color={"neutral.400"}
                                        variant={"body2"}
                                    >
                                        {t("Select preset")}:
                                    </Typography>
                                </Box>

                                <Select
                                    disabled={presets?.length === 0}
                                    labelId="demo-simple-select-label"
                                    placeholder="None"
                                    value={selectedPreset}
                                    onChange={(e) =>
                                        setSelectedPreset(+e.target.value)
                                    }
                                    renderValue={(selected) => (
                                        <Typography
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {presets?.find(
                                                (e) => e.id === selected
                                            )?.name ?? t("None")}
                                        </Typography>
                                    )}
                                >
                                    <MenuItem value={-1}>
                                        <Typography>{t("None")}</Typography>
                                    </MenuItem>
                                    {presets &&
                                        presets.length > 0 &&
                                        presets.map((preset) => (
                                            <MenuItem
                                                key={preset.id!}
                                                value={preset.id!}
                                            >
                                                <Typography>
                                                    {preset.name}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Stack>

                            <Stack
                                sx={{
                                    flexDirection: { md: "column", lg: "row" },
                                }}
                                mt={0.5}
                                gap={1}
                            >
                                <Button
                                    variant={"contained"}
                                    fullWidth
                                    disabled={!isDirty}
                                    onClick={() => setOpenPresetModal(true)}
                                >
                                    <Typography variant={"body2"}>
                                        {t("Save")}
                                    </Typography>
                                </Button>
                                <Button
                                    variant={"outlined"}
                                    fullWidth
                                    color="error"
                                    disabled={selectedPreset == -1}
                                    onClick={() => {
                                        deletePreset(preset?.id!!);
                                        setSelectedPreset(-1);
                                    }}
                                >
                                    <Typography variant={"body2"}>
                                        {t("Delete")}
                                    </Typography>
                                    <ClearIcon
                                        sx={{
                                            marginLeft: 0.5,
                                            fontSize: "14px",
                                        }}
                                        color={
                                            selectedPreset !== -1
                                                ? "error"
                                                : "disabled"
                                        }
                                    />
                                </Button>
                            </Stack>
                        </FormControl>
                    </Stack>
                </Box>

                {/* Right PermissionsTable */}
                <div style={{ flex: "5" }}>
                    <PermissionsTable />
                </div>
            </Box>
            <Stack py={2} spacing={2} direction={"row"} sx={{ float: "right" }}>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={
                        selectedUser === -1 ||
                        targetUser === -1 ||
                        isFetching ||
                        isLoading
                    }
                    onClick={() => saveRelationship(data!)}
                >
                    {t("Apply Changes")}
                </Button>
            </Stack>
            {openPresetModal && (
                <SavePresetDialog
                    presetName={selectedPreset === -1 ? "" : preset?.name}
                    open={openPresetModal}
                    setOpen={setOpenPresetModal}
                    handleSave={handleSave}
                />
            )}
        </>
    );
};

export default PermissionPage;
