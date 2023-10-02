import Card from "@/Components/Atoms/Card";
import InputLabel from "@/Components/Atoms/InputLabel";
import Searchbar from "@/Components/Atoms/Searchbar";
import VehicleTable from "@/Components/Molecules/VehicleTable";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useState } from "react";

export default function Vehicle() {
    const [age, setAge] = useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <MainLayout>
            <Head title="Vehicle" />
            <Card
                headerText="Vehicle List Table"
                rightButton={
                    <>
                        <Link
                            href="/"
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
                        <InputLabel id="demo-select-small-label">
                            Pilih Tipe
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <VehicleTable />
            </Card>
        </MainLayout>
    );
}
