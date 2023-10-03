import { BsDoorOpenFill } from "react-icons/bs";
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
                        role: "all",
                        icon: BiSolidBarChartSquare,
                    },
                    {
                        label: "Daftar Kendaraan",
                        href: "/vehicle",
                        role: "admin",
                        icon: AiFillCar,
                    },
                    {
                        label: "Data Booking",
                        href: "/booking",
                        role: "all",
                        icon: BiSolidBookContent,
                    },
                    {
                        label: "Pengguna",
                        href: "/users",
                        role: "admin",
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
                    // {
                    //     label: "Pengaturan",
                    //     href: "/dashboard/setting",
                    //     role: "all",
                    //     icon: BsGearWideConnected,
                    // },
                    {
                        label: "Keluar",
                        href: "/logout",
                        role: "all",
                        icon: BsDoorOpenFill,
                    },
                ],
            },
        ],
    },
];
