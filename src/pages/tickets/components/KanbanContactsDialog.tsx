import { FC, useState } from "react";
// @mui
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
// _mock_

// @types
import { IKanbanAssignee } from "src/types/kanban";
// components
import { Scrollbar } from "src/components/scrollbar";
import Iconify from "../../../components/iconify";
import SearchNotFound from "../../../components/search-not-found";
import { useTranslation } from "react-i18next";
import { useAllCustomersQuery } from "src/services/customers";
import { ICustomer } from "src/types/customer";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

type Props = {
    assignee?: IKanbanAssignee[];
    open: boolean;
    onClose: VoidFunction;
};

const _contacts = [
    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",

        name: "Jayvion Simon",

        username: "Jayvion Simon",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg",

        address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",

        phone: "365-374-4961",

        email: "nannie_abernathy70@yahoo.com",

        lastActivity: new Date("2023-08-30T16:08:50.000Z").toISOString(),

        status: "offline",

        role: "ux designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",

        name: "Lucian Obrien",

        username: "Lucian Obrien",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",

        address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",

        phone: "904-966-2836",

        email: "ashlynn_ohara62@gmail.com",

        lastActivity: new Date("2023-08-29T15:08:50.000Z").toISOString(),

        status: "away",

        role: "full stack designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",

        name: "Deja Brady",

        username: "Deja Brady",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_3.jpg",

        address: "18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337",

        phone: "399-757-9909",

        email: "milo.farrell@hotmail.com",

        lastActivity: new Date("2023-08-28T14:08:50.000Z").toISOString(),

        status: "away",

        role: "backend developer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",

        name: "Harrison Stein",

        username: "Harrison Stein",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg",

        address: "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",

        phone: "692-767-2903",

        email: "violet.ratke86@yahoo.com",

        lastActivity: new Date("2023-08-27T13:08:50.000Z").toISOString(),

        status: "online",

        role: "ux designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",

        name: "Reece Chung",

        username: "Reece Chung",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_5.jpg",

        address: "36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836",

        phone: "990-588-5716",

        email: "letha_lubowitz24@yahoo.com",

        lastActivity: new Date("2023-08-26T12:08:50.000Z").toISOString(),

        status: "busy",

        role: "ux designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",

        name: "Lainey Davidson",

        username: "Lainey Davidson",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_6.jpg",

        address: "2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827",

        phone: "955-439-2578",

        email: "aditya_greenfelder31@gmail.com",

        lastActivity: new Date("2023-08-25T11:08:50.000Z").toISOString(),

        status: "offline",

        role: "project manager",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",

        name: "Cristopher Cardenas",

        username: "Cristopher Cardenas",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_7.jpg",

        address: "279 Karolann Ports Apt. 774 - Prescott Valley, WV / 53905",

        phone: "226-924-4058",

        email: "lenna_bergnaum27@hotmail.com",

        lastActivity: new Date("2023-08-24T10:08:50.000Z").toISOString(),

        status: "away",

        role: "leader",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",

        name: "Melanie Noble",

        username: "Melanie Noble",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_8.jpg",

        address: "96607 Claire Square Suite 591 - St. Louis Park, HI / 40802",

        phone: "552-917-1454",

        email: "luella.ryan33@gmail.com",

        lastActivity: new Date("2023-08-23T09:08:50.000Z").toISOString(),

        status: "busy",

        role: "backend developer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9",

        name: "Chase Day",

        username: "Chase Day",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_9.jpg",

        address: "9388 Auer Station Suite 573 - Honolulu, AK / 98024",

        phone: "285-840-9338",

        email: "joana.simonis84@gmail.com",

        lastActivity: new Date("2023-08-22T08:08:50.000Z").toISOString(),

        status: "away",

        role: "project manager",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10",

        name: "Shawn Manning",

        username: "Shawn Manning",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_10.jpg",

        address: "47665 Adaline Squares Suite 510 - Blacksburg, NE / 53515",

        phone: "306-269-2446",

        email: "marjolaine_white94@gmail.com",

        lastActivity: new Date("2023-08-21T07:08:50.000Z").toISOString(),

        status: "away",

        role: "ui designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11",

        name: "Soren Durham",

        username: "Soren Durham",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_11.jpg",

        address: "989 Vernice Flats Apt. 183 - Billings, NV / 04147",

        phone: "883-373-6253",

        email: "vergie_block82@hotmail.com",

        lastActivity: new Date("2023-08-20T06:08:50.000Z").toISOString(),

        status: "offline",

        role: "ui/ux designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12",

        name: "Cortez Herring",

        username: "Cortez Herring",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_12.jpg",

        address: "91020 Wehner Locks Apt. 673 - Albany, WY / 68763",

        phone: "476-509-8866",

        email: "vito.hudson@hotmail.com",

        lastActivity: new Date("2023-08-19T05:08:50.000Z").toISOString(),

        status: "away",

        role: "ui/ux designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b13",

        name: "Brycen Jimenez",

        username: "Brycen Jimenez",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_13.jpg",

        address: "585 Candelario Pass Suite 090 - Columbus, LA / 25376",

        phone: "201-465-1954",

        email: "tyrel_greenholt@gmail.com",

        lastActivity: new Date("2023-08-18T04:08:50.000Z").toISOString(),

        status: "away",

        role: "ui designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b14",

        name: "Giana Brandt",

        username: "Giana Brandt",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_14.jpg",

        address: "80988 Renner Crest Apt. 000 - Fargo, VA / 24266",

        phone: "538-295-9408",

        email: "dwight.block85@yahoo.com",

        lastActivity: new Date("2023-08-17T03:08:50.000Z").toISOString(),

        status: "online",

        role: "backend developer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15",

        name: "Aspen Schmitt",

        username: "Aspen Schmitt",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_15.jpg",

        address: "28307 Shayne Pike Suite 523 - North Las Vegas, AZ / 28550",

        phone: "531-492-6028",

        email: "mireya13@hotmail.com",

        lastActivity: new Date("2023-08-16T02:08:50.000Z").toISOString(),

        status: "away",

        role: "backend developer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b16",

        name: "Colten Aguilar",

        username: "Colten Aguilar",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_16.jpg",

        address: "205 Farrell Highway Suite 333 - Rock Hill, OK / 63421",

        phone: "981-699-7588",

        email: "dasia_jenkins@hotmail.com",

        lastActivity: new Date("2023-08-15T01:08:50.000Z").toISOString(),

        status: "online",

        role: "front end developer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17",

        name: "Angelique Morse",

        username: "Angelique Morse",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_17.jpg",

        address: "253 Kara Motorway Suite 821 - Manchester, SD / 09331",

        phone: "500-268-4826",

        email: "benny89@yahoo.com",

        lastActivity: new Date("2023-08-14T00:08:50.000Z").toISOString(),

        status: "online",

        role: "backend developer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b18",

        name: "Selina Boyer",

        username: "Selina Boyer",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_18.jpg",

        address: "13663 Kiara Oval Suite 606 - Missoula, AR / 44478",

        phone: "205-952-3828",

        email: "dawn.goyette@gmail.com",

        lastActivity: new Date("2023-08-12T23:08:50.000Z").toISOString(),

        status: "offline",

        role: "full stack designer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b19",

        name: "Lawson Bass",

        username: "Lawson Bass",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_19.jpg",

        address: "8110 Claire Port Apt. 703 - Anchorage, TN / 01753",

        phone: "222-255-5190",

        email: "zella_hickle4@yahoo.com",

        lastActivity: new Date("2023-08-11T22:08:50.000Z").toISOString(),

        status: "offline",

        role: "full stack developer",
    },

    {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20",

        name: "Ariana Lang",

        username: "Ariana Lang",

        avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_20.jpg",

        address: "4642 Demetris Lane Suite 407 - Edmond, AZ / 60888",

        phone: "408-439-8033",

        email: "avery43@hotmail.com",

        lastActivity: new Date("2023-08-10T21:08:50.000Z").toISOString(),

        status: "online",

        role: "backend developer",
    },
];

interface AssigneeItemProps {
    customer: ICustomer;
}

const AssigneeItem: FC<AssigneeItemProps> = ({ customer }) => {
    // const checked = assignee
    //     .map((person) => person.name)
    //     .includes(contact.name);

    const checked = true;

    if (!customer.firstName || !customer.lastName) return <></>;

    return (
        <ListItem
            key={customer.id}
            disableGutters
            secondaryAction={
                <Button
                    size="small"
                    color={checked ? "primary" : "inherit"}
                    startIcon={
                        <Iconify
                            icon={
                                checked ? "eva:checkmark-fill" : "eva:plus-fill"
                            }
                        />
                    }
                >
                    {checked ? "assigned" : "assign"}
                </Button>
            }
            sx={{ height: ITEM_HEIGHT }}
        >
            <ListItemAvatar>
                <Avatar src={""} />
            </ListItemAvatar>

            <ListItemText
                primaryTypographyProps={{
                    typography: "subtitle2",
                    sx: { mb: 0.25 },
                }}
                secondaryTypographyProps={{
                    typography: "caption",
                }}
                primary={`${customer.firstName} ${customer.lastName}`}
                secondary={customer.email}
            />
        </ListItem>
    );
};

export default function KanbanContactsDialog({
    assignee = [],
    open,
    onClose,
}: Props) {
    const { t } = useTranslation();

    const [searchContacts, setSearchContacts] = useState("");

    const handleSearchContacts = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchContacts(event.target.value);

    const { data: customers } = useAllCustomersQuery();

    // const dataFiltered = applyFilter({
    //     inputData: _contacts,
    //     query: searchContacts,
    // });

    // const isNotFound = !dataFiltered.length && !!searchContacts;

    if (!customers) return null;

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 0 }}>
                {t("Customers")}
                <Typography component="span">{` (${customers.length})`}</Typography>
            </DialogTitle>

            <Box sx={{ px: 3, py: 2.5 }}>
                <TextField
                    fullWidth
                    value={searchContacts}
                    onChange={handleSearchContacts}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify
                                    icon="eva:search-fill"
                                    sx={{ color: "text.disabled" }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <DialogContent sx={{ p: 0 }}>
                {/* {isNotFound ? (
                    <SearchNotFound
                        query={searchContacts}
                        sx={{ mt: 3, mb: 10 }}
                    />
                ) : ( */}
                <Scrollbar
                    sx={{
                        px: 2.5,
                        height: ITEM_HEIGHT * 6,
                    }}
                >
                    {customers?.map((customer, i) => (
                        <AssigneeItem customer={customer} key={i} />
                    ))}
                    {/* {dataFiltered.map((contact) => {
                            
                        }) */}
                </Scrollbar>
                {/* )} */}
            </DialogContent>
        </Dialog>
    );
}

// ----------------------------------------------------------------------

function applyFilter({
    inputData,
    query,
}: {
    inputData: IKanbanAssignee[];
    query: string;
}) {
    if (query) {
        inputData = inputData.filter(
            (contact) =>
                contact.name.toLowerCase().indexOf(query.toLowerCase()) !==
                    -1 ||
                contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }

    return inputData;
}
