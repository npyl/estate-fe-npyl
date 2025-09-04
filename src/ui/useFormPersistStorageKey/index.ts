import { useMemo } from "react";

/**
 * Hook that creates a storageKey for useFormPersist by respecting its internal logic
 *
 * Supports the following modes: create, edit, disabled
 *
 * Logic:
 *  2. disabled flag is true; we are purposefully disabling persistence for some reason (e.g. quickCreate)
 *  3. resourceId is -1 (for compatibility with some forms); we are on create => e.g. PPCustomerForm-create
 *  4. resourceId is not falsy; we are on edit => e.g. PPCustomerForm-XXX
 *
 * @param baseName Storage Key's base name e.g. PPCustomerForm
 * @param resourceId A property's, customer's, task's, etc. id
 * @param disabled Explicitly disable persistance
 */
const useFormPersistStorageKey = (
    baseName: string,
    resourceId: number = -1,
    disabled?: boolean
) =>
    useMemo(() => {
        if (disabled) return null;

        if (resourceId === -1) return `${baseName}-create`;

        return `${baseName}-${resourceId}`;
    }, []);

export default useFormPersistStorageKey;
