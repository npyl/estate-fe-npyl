import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { IPreset, IRolesReq, ITargets } from "src/interfaces/roles";
import { initRoles } from "src/pages/security/components/permission/constants";
import {
    useGetPresetByIdQuery,
    useGetRelationshipQuery,
} from "src/services/security";

export type ISecurityState = {
    data: IRolesReq;
    setData: Dispatch<SetStateAction<IRolesReq>>;
    targetUser: number;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
    isDirty: boolean;
    setTargetUser: Dispatch<SetStateAction<number>>;
    selectedPreset: number;
    setSelectedPreset: Dispatch<SetStateAction<number>>;
    selectedUser: number;
    setSelectedUser: Dispatch<SetStateAction<number>>;
    preset?: IPreset;
    isFetching: boolean;
};

export const SecurityContext = createContext<ISecurityState | undefined>(
    undefined
);

export const useSecurityContext = () => {
    const context = useContext(SecurityContext);

    if (context === undefined) {
        throw new Error(
            "SecurityContext value is undefined. Make sure you use the SecurityContext before using the context."
        );
    }

    return context;
};

export const initialData = {
    id: null,
    source: {} as ITargets,
    target: {} as ITargets,
    permissionResponses: initRoles,
};

const useSecurityState = () => {
    const [data, setData] = useState<IRolesReq>(initialData);
    const [targetUser, setTargetUser] = useState<number>(-1);
    const [selectedPreset, setSelectedPreset] = useState<number>(-1);
    const [selectedUser, setSelectedUser] = useState<number>(-1);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const skipRelation = useMemo(() => {
        return targetUser === -1 || selectedUser === -1;
    }, [selectedUser, targetUser]);
    const {
        data: roles,
        isSuccess,
        isFetching,
    } = useGetRelationshipQuery(
        { sourceUserId: selectedUser, targetUserId: targetUser },
        { skip: skipRelation }
    );

    const skipPresetById = useMemo(() => {
        return selectedPreset === -1;
    }, [selectedPreset]);
    const { data: preset, isSuccess: isSuccessPreset } = useGetPresetByIdQuery(
        selectedPreset,
        {
            skip: skipPresetById,
        }
    );

    useEffect(() => {
        if (preset && isSuccessPreset && selectedPreset !== -1) {
            setData({ ...data, permissionResponses: preset.permissions! });
            setIsDirty(false);
        }
    }, [preset, isSuccessPreset, selectedPreset]);

    useEffect(() => {
        if (roles && isSuccess && selectedPreset === -1) {
            setData(roles);
            setIsDirty(false);
        }
    }, [roles, isSuccess, selectedPreset]);

    const state = useMemo(
        () => ({
            preset,
            data,
            setData,
            targetUser,
            setTargetUser,
            selectedPreset,
            setSelectedPreset,
            selectedUser,
            setSelectedUser,
            isDirty,
            setIsDirty,
            isFetching,
        }),
        [
            isFetching,
            preset,
            isDirty,
            setIsDirty,
            data,
            setData,
            targetUser,
            setTargetUser,
            selectedPreset,
            setSelectedPreset,
            selectedUser,
            setSelectedUser,
        ]
    );

    return state;
};

export const SecurityProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const value = useSecurityState();
    return <SecurityContext.Provider value={value} {...props} />;
};
