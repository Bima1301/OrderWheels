import Card from "@/Components/Atoms/Card";
import InputLabel from "@/Components/Atoms/InputLabel";
import Searchbar from "@/Components/Atoms/Searchbar";
import BookingTable from "@/Components/Organisms/BookingTable";
import VehicleTable from "@/Components/Organisms/VehicleTable";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Alert,
    FormControl,
    IconButton,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

export default function Index(props) {
    const [openAlert, setOpenAlert] = useState("");
    const [query, setQuery] = useState({
        keyword: props?.keyword || "",
        page: 1,
        status: props?.status || "",
    });

    useEffect(() => {
        if (props.flash?.success) {
            setOpenAlert({ success: true, error: false });
        }
    }, [props.flash]);

    const handleChange = (event) => {
        event.preventDefault();
        setQuery({ ...query, status: event.target.value });
        router.get(
            route("index-booking"),
            {
                ...query,
                status: event.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery({ ...query, keyword: e.target.value });
        router.get(
            route("index-booking"),
            {
                ...query,
                keyword: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleDeboucheSearch = debounce(handleSearch, 400);

    return (
        <MainLayout>
            {openAlert && (
                <Alert
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                            <FaTimes />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {props?.flash?.success}
                </Alert>
            )}
            <Head title="Vehicle" />
            <Card
                headerText="Data Booking"
                rightButton={
                    <>
                        {props?.auth?.user?.role?.name === "admin" && (
                            <a
                                href="/booking/export-excel"
                                target="_blank"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Export Excel
                            </a>
                        )}
                    </>
                }
            >
                <div className="flex md:flex-row flex-col justify-between md:items-center gap-5 mb-3">
                    <Searchbar
                        placeholder={"Cari Peminjam"}
                        onChange={handleDeboucheSearch}
                        defaultValue={query?.keyword}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={query?.status}
                            displayEmpty
                            label="Age"
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Pilih Status</em>;
                                } else if (selected === "pending") {
                                    return <em>Menunggu</em>;
                                } else if (selected === "approved") {
                                    return <em>Disetujui</em>;
                                } else if (selected === "rejected") {
                                    return <em>Ditolak</em>;
                                } else if (selected === "returned") {
                                    return <em>Dikembalikan</em>;
                                }
                            }}
                        >
                            <MenuItem disabled value="">
                                <em>Pilih Status</em>
                            </MenuItem>
                            <MenuItem value="">
                                <em className="text-red-500">None</em>
                            </MenuItem>
                            <MenuItem value="pending">Menunggu</MenuItem>
                            <MenuItem value="approved">Disetujui</MenuItem>
                            <MenuItem value="rejected">Ditolak</MenuItem>
                            <MenuItem value="returned">Dikembalikan</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <BookingTable
                    data={props?.booking_vehicle}
                    query={query}
                    userRole={props?.auth?.user?.role?.name}
                />
            </Card>
        </MainLayout>
    );
}
