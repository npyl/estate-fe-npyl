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
import Box from "@mui/material/Box";

const User: NextPage = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);
    const { t } = useTranslation();

    const router = useRouter(); // Initialize useRouter

    return (
       <>
           <Box
               sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
           >
               <Tabs
                   orientation="vertical"
                   variant="scrollable"
                   value={value}
                   onChange={handleChange}
                   aria-label="Vertical tabs example"
                   sx={{ borderRight: 1, borderColor: 'divider' }}
               >
                   <Tab label="Item One" {...a11yProps(0)} />
                   <Tab label="Item Two" {...a11yProps(1)} />
                   <Tab label="Item Three" {...a11yProps(2)} />
                   <Tab label="Item Four" {...a11yProps(3)} />
                   <Tab label="Item Five" {...a11yProps(4)} />
                   <Tab label="Item Six" {...a11yProps(5)} />
                   <Tab label="Item Seven" {...a11yProps(6)} />
               </Tabs>
               <TabPanel value={value} index={0}>
                   Item One
                   <>
                       <TabPanel value={value} index={0}><SecurityPage/></TabPanel>
                   </>
               </TabPanel>
               <TabPanel value={value} index={1}>
                   Item Two
               </TabPanel>
               <TabPanel value={value} index={2}>
                   Item Three
               </TabPanel>
               <TabPanel value={value} index={3}>
                   Item Four
               </TabPanel>
               <TabPanel value={value} index={4}>
                   Item Five
               </TabPanel>
               <TabPanel value={value} index={5}>
                   Item Six
               </TabPanel>
               <TabPanel value={value} index={6}>
                   Item Seven
               </TabPanel>
           </Box>
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
