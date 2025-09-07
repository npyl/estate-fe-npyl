import type { NextPage } from "next";
import GuestGuard from "@/sections/Login/GuestGuard";
import LoginSection from "@/sections/Login";

const Login: NextPage = () => <LoginSection />;

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
