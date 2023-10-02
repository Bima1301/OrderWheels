import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useIsMobile from "../Hooks/useIsMobile";
import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";

const Topbar = ({ showNav, setShowNav, name }) => {
    const isMobile = useIsMobile();

    const settings = ["Profile", "Account", "Dashboard", "Logout"];
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <div
            className={`bg-white fixed w-full h-24 flex justify-between gap-2 items-center transition-all duration-300 shadow-md z-30 ${
                showNav ? "pl-56" : ""
            }`}
        >
            {isMobile && showNav ? <div /> : ""}
            <div
                className={`lg:pl-12 pl-5 flex flex-row items-center gap-3 ms-3 ${
                    isMobile && showNav ? "hidden" : ""
                }`}
            >
                <div
                    className={`bg-black/50 text-white rounded-full p-1 cursor-pointer hover:scale-110 duration-200 ${
                        isMobile ? "hidden" : ""
                    }`}
                    onClick={() => {
                        setShowNav(false);
                    }}
                >
                    <IoIosArrowBack size={24} />
                </div>
                <div
                    className="bg-black/50 text-white rounded-full p-1 cursor-pointer hover:scale-110 duration-200"
                    onClick={() => {
                        setShowNav(true);
                    }}
                >
                    <IoIosArrowForward size={24} />
                </div>
            </div>

            <div className="flex items-center lg:pr-16 pr-4">
                <div>
                    <div className="flex flex-row items-center gap-4">
                        <p className="text-sm font-bold ">
                            <span className="font-normal">Hello, &nbsp;</span>
                            {name}
                        </p>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://placebeard.it/250/250"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
