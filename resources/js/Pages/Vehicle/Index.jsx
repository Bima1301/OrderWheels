import Card from "@/Components/Atoms/Card";
import InputLabel from "@/Components/Atoms/InputLabel";
import Searchbar from "@/Components/Atoms/Searchbar";
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
    const [openAlert, setOpenAlert] = useState({
        success: false,
        error: false,
    });
    const [query, setQuery] = useState({
        keyword: props?.keyword || "",
        page: 1,
        type: props?.type || "",
    });

    useEffect(() => {
        if (props?.flash?.success) {
            setOpenAlert({ success: true, error: false });
        } else if (props?.flash?.error) {
            setOpenAlert({ success: false, error: true });
        }
    }, [props.flash]);
    const handleChange = (event) => {
        event.preventDefault();
        setQuery({ ...query, type: event.target.value });
        router.get(
            "vehicle",
            {
                ...query,
                type: event.target.value,
            },
            {
                preserveState: false,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery({ ...query, keyword: e.target.value });
        router.get(
            "vehicle",
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
            {openAlert?.error && (
                <Alert
                    severity="error"
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
                    {props?.flash?.error}
                </Alert>
            )}
            {openAlert.success && (
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
                headerText="Daftar Kendaraan"
                rightButton={
                    <>
                        <Link
                            href="/vehicle/create"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Vehicle
                        </Link>
                    </>
                }
            >
                <div className="flex md:flex-row flex-col justify-between md:items-center gap-5 mb-3">
                    <Searchbar
                        placeholder={"Cari Kendaraan"}
                        onChange={handleDeboucheSearch}
                        defaultValue={query?.keyword}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={query?.type}
                            displayEmpty
                            label="Age"
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Pilih Tipe</em>;
                                } else {
                                    return selected;
                                }
                            }}
                        >
                            <MenuItem disabled value="">
                                <em>Pilih Tipe</em>
                            </MenuItem>
                            <MenuItem value="">
                                <em className="text-red-500">None</em>
                            </MenuItem>
                            {props?.vehicle_type?.map((item, index) => (
                                <MenuItem key={index} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <VehicleTable data={props?.vehicles} query={query} />
            </Card>
        </MainLayout>
    );
}
