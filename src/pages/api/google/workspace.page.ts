import type { NextApiRequest, NextApiResponse } from "next/types";
import workspaceService from "./_service/WorkspaceService";
import toNumberSafe from "@/utils/toNumberSafe";
import { IGoogleWorkspaceIntegrationReq } from "@/services/company";

import * as yup from "yup";
import debugLog from "@/_private/debugLog";

// -------------------------------------------------------------------------------------------

const updateShema = yup.object({
    clientId: yup.string().required(),
    clientSecret: yup.string().required(),
    domain: yup.string().required(),
});

const validateAndSanitise = (body: IGoogleWorkspaceIntegrationReq) => {
    // INFO: this throws
    updateShema.validateSync(body, { abortEarly: true });

    const { clientId, clientSecret, domain } = body;

    const validBody = {
        clientId: clientId.trim(),
        clientSecret: clientSecret.trim(),
        domain: domain.trim(),
    };

    debugLog("sanitized: ", validBody);

    return validBody;
};

// -------------------------------------------------------------------------------------------

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (
            req.method !== "GET" &&
            req.method !== "PUT" &&
            req.method !== "DELETE"
        )
            throw new Error("Bad method");

        const Authorization = req.headers.authorization;
        if (!Authorization) throw new Error("Invalid headers");

        /**
         * isIntegrated
         */
        if (req.method === "GET") {
            const creds = await workspaceService.isIntegrated(Authorization);
            res.status(200).json({
                isIntegrated: Boolean(creds),
                domain: creds?.domain,
            });
        }

        /**
         * Update
         */
        if (req.method === "PUT") {
            const body = (await req.body) as IGoogleWorkspaceIntegrationReq;
            if (!body) throw new Error("Bad body");

            const validBody = validateAndSanitise(body);

            await workspaceService.updateIntegration(Authorization, validBody);

            res.status(200).json({});
        }

        /**
         * Remove
         */
        if (req.method === "DELETE") {
            const url = new URL(req.url!, `http://${req.headers.host}`);
            const userId = url.searchParams.get("userId") as string;
            const iUserId = toNumberSafe(userId);
            if (iUserId === -1) throw "Bad userId";

            await workspaceService.deleteIntegration(iUserId, Authorization);
            res.status(200).json({});
        }
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
