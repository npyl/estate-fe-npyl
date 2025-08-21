import getProfile from "../service/getProfile";

const isTokenExpired = async (accessToken: string) => {
    const id = await getProfile(accessToken);
    return id === -1;
};

export default isTokenExpired;
