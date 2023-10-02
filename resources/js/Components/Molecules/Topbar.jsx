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
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = ({ showNav, setShowNav, name }) => {
    const isMobile = useIsMobile();

    const pages = ["Products", "Pricing", "Blog"];
    const settings = ["Profile", "Account", "Dashboard", "Logout"];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <div
            className={`bg-white fixed w-full h-24 flex justify-between gap-2 items-center transition-all duration-300 shadow-lg ${
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
                {/* <DropdownProfile name={name} /> */}
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://placebeard.it/250/250"
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={handleCloseUserMenu}
                            >
                                <Typography textAlign="center">
                                    {setting}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </div>
        </div>
    );
};

export default Topbar;
