import getProfileId from "../service/getProfileId";

const isTokenExpired = async (accessToken: string) => {
    const id = await getProfileId(accessToken);
    return id === -1;
};

export default isTokenExpired;
