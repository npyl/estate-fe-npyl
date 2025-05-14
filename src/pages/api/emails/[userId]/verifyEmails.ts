import debugLog from "@/_private/debugLog";

const apiUrl = process.env.DEV_ME_API_URL;
const apiKey = process.env.DEV_ME_API_KEY;

interface IVerifyRes {
    email: string;
    validMx: boolean;
    validSmtp: boolean;
    validFormat: boolean;
    isDisposable: boolean;
    isFree: boolean;
}

const verifyEmail = async (email: string) => {
    const queryParams = new URLSearchParams({
        email: email,
        verifyMx: true.toString(),
        verifySmtp: true.toString(),
        timeout: "3000",
    });

    const url = `${apiUrl}?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "x-api-key": apiKey,
            } as any,
        });

        if (!response.ok) {
            return false;
        }

        const res = ((await response.json()) || {}) as IVerifyRes;
        debugLog(res);

        const { isDisposable, validFormat, validMx, validSmtp } = res;

        // TODO: what does isFree mean?
        if (!isDisposable && validFormat && validMx && validSmtp) return true;

        return false;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

const verifyEmails = async (emails: string[]) => {
    const all = await Promise.all(emails.map(verifyEmail));
    if (!all.every(Boolean)) return false;
    return true;
};

export default verifyEmails;
