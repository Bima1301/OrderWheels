import {
    BsDoorOpen,
    BsFillDoorOpenFill,
    BsFillGearFill,
    BsGearWideConnected,
} from "react-icons/bs";
import {
    BiSolidBarChartSquare,
    BiSolidBookContent,
    BiSolidUserAccount,
} from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";

export const sidebarItems = [
    {
        top: [
            {
                mainLabel: "",
                items: [
                    {
                        label: "Dashboard",
                        href: "/",
                        icon: BiSolidBarChartSquare,
                    },
                    {
                        label: "Vehicle",
                        href: "/vehicle",
                        icon: AiFillCar,
                    },
                    {
                        label: "Report",
                        href: "/report",
                        icon: BiSolidBookContent,
                    },
                    {
                        label: "User",
                        href: "/user",
                        icon: BiSolidUserAccount,
                    },
                ],
            },
        ],
    },
    {
        bottom: [
            {
                mainLabel: "",
                items: [
                    {
                        label: "Pengaturan",
                        href: "/dashboard/setting",
                        icon: BsGearWideConnected,
                    },
                    {
                        label: "Keluar",
                        href: "/logout",
                        icon: BsDoorOpen,
                    },
                ],
            },
        ],
    },
];
