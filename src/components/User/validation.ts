import { string, object, StringSchema } from "yup";

const numberString = (label: string): StringSchema =>
    string().test("is-number", `${label} must be a number`, (value) =>
        // NOTE: return true if !value, because regex doesn't allow null, but we want to support empty string
        value ? /^\d+$/.test(value) : true
    );

export const Schema = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string()
        .email("Email must be a valid email address")
        .required("Email is required"),

    password: string().required("Password is required"),

    mobilePhone: numberString("Mobile Phone").required(),
    homePhone: numberString("Home Phone"),
    businessPhone: numberString("Business Phone"),
    officePhone: numberString("Office Phone"),
    callCenterNumber: numberString("Call Center Number"),

    address: string().required(),
    zipCode: string().required(),
    city: string().required(),
    region: string().required(),

    afm: numberString("AFM"),
    doy: numberString("DOY"),
    gemh: numberString("GEMH"),

    status: string().oneOf(["Active", "Inactive"]),

    preferredLanguage: string().oneOf(["ENGLISH", "GREEK"]),
});
