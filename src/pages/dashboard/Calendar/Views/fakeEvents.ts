import { TCalendarEvent, TCalendarEventType } from "../types";

const fakeTypes: TCalendarEventType[] = [
    {
        id: 1,
        name: "meeting",
        color: "#ddcdc2",
    },
    {
        id: 2,
        name: "tour-online",
        color: "#C7C9CB",
    },
    {
        id: 3,
        name: "tour-in-person",
        color: "primary.light",
    },
];

const fakeEvents: TCalendarEvent[] = [
    {
        id: 1,
        title: "Team Meeting",
        location: "Conference Room A",
        type: fakeTypes[0],
        startDate: new Date(2024, 9, 11, 9, 0), // 9:00 AM
        endDate: new Date(2024, 9, 11, 10, 30), // 10:30 AM
        withIds: [1, 2, 3],
    },
    {
        id: 2,
        title: "Lunch with Client",
        location: "Cafe Mocha",
        type: fakeTypes[0],
        startDate: new Date(2024, 9, 11, 12, 0), // 12:00 PM
        endDate: new Date(2024, 9, 11, 13, 30), // 1:30 PM
        withIds: [4],
    },
    {
        id: 3,
        title: "Project Review",
        location: "Virtual Meeting",
        type: fakeTypes[1],
        startDate: new Date(2024, 9, 11, 14, 0), // 2:00 PM
        endDate: new Date(2024, 9, 11, 15, 0), // 3:00 PM
        withIds: [2, 5, 6],
    },
    {
        id: 4,
        title: "Gym",
        location: "Fitness Center",
        type: fakeTypes[2],
        startDate: new Date(2024, 9, 11, 18, 0), // 6:00 PM
        endDate: new Date(2024, 9, 11, 19, 30), // 7:30 PM
        withIds: [],
    },
];

export default fakeEvents;
