import Card from "@/Components/Atoms/Card";
import Searchbar from "@/Components/Atoms/Searchbar";
import UsersTable from "@/Components/Organisms/UsersTable";
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
        role: props?.role || "",
    });

    useEffect(() => {
        if (props.flash?.success) {
            setOpenAlert({ success: true, error: false });
        }
    }, [props.flash]);

    const handleChange = (event) => {
        event.preventDefault();
        setQuery({ ...query, role: event.target.value });
        router.get(
            "/users",
            {
                ...query,
                role: event.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery({ ...query, keyword: e.target.value });
        router.get(
            "/users",
            {
                ...query,
                keyword: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
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
            <Card headerText="Daftar Kendaraan">
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
                            value={query?.role}
                            displayEmpty
                            label="Age"
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Pilih Role</em>;
                                } else {
                                    return (
                                        props?.roles
                                            ?.find(
                                                (item) => item.id == selected
                                            )
                                            ?.name.charAt(0)
                                            .toUpperCase() +
                                        props?.roles
                                            ?.find(
                                                (item) => item.id == selected
                                            )
                                            ?.name.slice(1)
                                    );
                                }
                            }}
                        >
                            <MenuItem disabled value="">
                                <em>Pilih Role</em>
                            </MenuItem>
                            <MenuItem value="">
                                <em className="text-red-500">None</em>
                            </MenuItem>
                            {props?.roles?.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                    {item.name.charAt(0).toUpperCase() +
                                        item.name.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <UsersTable data={props?.users} query={query} roles={props?.roles} />
            </Card>
        </MainLayout>
    );
}
