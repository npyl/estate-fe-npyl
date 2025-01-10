const getChatToken = (userId: number) => {
    if (userId === 1) {
        return process.env.NEXT_PUBLIC_TOKEN_0 || "";
    } else if (userId === 4) {
        return process.env.NEXT_PUBLIC_TOKEN_1 || "";
    }

    return "";
};

export default getChatToken;
