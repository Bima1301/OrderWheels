import Card from "@/Components/Atoms/Card";
import InputLabel from "@/Components/Atoms/InputLabel";
import Searchbar from "@/Components/Atoms/Searchbar";
import VehicleTable from "@/Components/Molecules/VehicleTable";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
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

export default function Index(props) {
    const [age, setAge] = useState("");
    const [openAlert, setOpenAlert] = useState("");

    useEffect(() => {
        if (props.flash?.success) {
            setOpenAlert({ success: true, error: false });
        }
    }, [props.flash]);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
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
                    <Searchbar placeholder={"Search Vehicle"} />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
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
                            {props?.vehicle_type?.map((item, index) => (
                                <MenuItem key={index} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <VehicleTable />
            </Card>
        </MainLayout>
    );
}
