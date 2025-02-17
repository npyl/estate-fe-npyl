import ClearIcon from "@mui/icons-material/Clear";
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
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSecurityContext } from "src/contexts/security";
import {
    useDeletePresetMutation,
    useGetPresetsQuery,
    useSavePresetMutation,
} from "src/services/security";
import { useAllUsersQuery } from "src/services/user";
const SavePresetDialog = dynamic(() => import("./PresetModal"));

const Sidebar = () => {
    const { t } = useTranslation();

    const { data: users } = useAllUsersQuery();
    const { data: presets } = useGetPresetsQuery();

    const [savePreset] = useSavePresetMutation();
    const [deletePreset] = useDeletePresetMutation();

    const [openPresetModal, setOpenPresetModal] = useState(false);

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
                            value={selectedUser !== -1 ? selectedUser : ""}
                            onChange={(e) => {
                                selectedPreset !== -1 && setSelectedPreset(-1);
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
                                        users?.find((e) => e.id === selected)
                                            ?.username
                                    }
                                </Typography>
                            )}
                        >
                            {users &&
                                users.length > 0 &&
                                users.map((user: any) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        <Typography>{user.username}</Typography>
                                    </MenuItem>
                                ))}
                        </Select>
                    </Stack>
                </FormControl>
                <Divider />
                <FormControl>
                    <FormLabel>
                        <Typography color={"neutral.400"} variant={"body2"}>
                            {t("Target user")}:
                        </Typography>
                    </FormLabel>
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={targetUser}
                        onChange={(e) => {
                            selectedPreset !== -1 && setSelectedPreset(-1);
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
                            onChange={(e) => setSelectedPreset(+e.target.value)}
                            renderValue={(selected) => (
                                <Typography
                                    sx={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {presets?.find((e) => e.id === selected)
                                        ?.name ?? t("None")}
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
                                        <Typography>{preset.name}</Typography>
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
                                    selectedPreset !== -1 ? "error" : "disabled"
                                }
                            />
                        </Button>
                    </Stack>
                </FormControl>
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

export default Sidebar;
