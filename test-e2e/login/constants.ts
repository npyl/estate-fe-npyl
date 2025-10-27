const BE_API_URL = "https://property-pro.gr/api/v0.1";

// -------------------------------------------------------------------------------------------------------

const PAGE_URL = "http://127.0.0.1:3000/__test__/refreshToken";

// -------------------------------------------------------------------------------------------------------

const REFRESH_URL = `${BE_API_URL}/refresh`;
const URL0 = `${process.env.NEXT_PUBLIC_API_URL}/users`;
const URL1 = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`;

// -------------------------------------------------------------------------------------------------------

const SHOULD_STAY_UNAUTHORIZED = false;
const SHOULD_FULLFILL_NATURALLY = true;

// -------------------------------------------------------------------------------------------------------

export {
    BE_API_URL,
    // ...
    PAGE_URL,
    // ...
    URL0,
    URL1,
    REFRESH_URL,
    // ...
    SHOULD_FULLFILL_NATURALLY,
    SHOULD_STAY_UNAUTHORIZED,
};
