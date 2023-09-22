import {NextPage} from "next";
import {AuthGuard} from "../../components/authentication/auth-guard";
import {DashboardLayout} from "../../components/dashboard/dashboard-layout";
import {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import {useTranslation} from "react-i18next";
import TabPanel from "../../components/Tabs/Tabs";
import SecurityPage from "./components/permission";
import UserPage from "./components/user";
import {useRouter} from "next/router";

const User: NextPage = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);
    const { t } = useTranslation();

    const router = useRouter(); // Initialize useRouter

    return (
       <>
           <Tabs
               value={value}
               onChange={handleChange}
               aria-label="View Property Tabs"
               sx={{padding:2}}
           >
               <Tab label={t("User")} {...a11yProps(0)} />
               <Tab label={t("" +
                   "Permissions")} {...a11yProps(1)} />
           </Tabs>

           <TabPanel value={value} index={0}><UserPage changeTab={handleChange}/></TabPanel>
           <TabPanel value={value} index={1}><SecurityPage/></TabPanel>
       </>
    );
};

User.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default User;
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
