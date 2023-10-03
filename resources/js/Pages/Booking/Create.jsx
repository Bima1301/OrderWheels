import BackButton from "@/Components/Atoms/BackButton";
import Card from "@/Components/Atoms/Card";
import InputError from "@/Components/Atoms/InputError";
import InputLabel from "@/Components/Atoms/InputLabel";
import TextInput from "@/Components/Atoms/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { BsSave } from "react-icons/bs";
import SaveButton from "@/Components/Atoms/SaveButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Create(props) {
    const { data, setData, post, progress, errors } = useForm({
        vehicle_id: props?.vehicle?.id,
        driver_name: "",
        purpose: "",
        booking_date: "",
        return_date: "",
        approved_by: "",
    });

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("store-booking"), {
            preserveScroll: false,
            preserveState: true,
            onProgress: () => {
                toast.loading("Loading...");
            },
            onError: () => {
                toast.dismiss();
                toast.error("Terjadi kesalahan!");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Berhasil menambahkan kendaraan!");
            },
        });
    };
    return (
        <MainLayout>
            <Head title="Create Vehicle" />
            <BackButton href={"/vehicle"} className="md:mb-8 mb-5" />
            <Card headerText="Pinjam Kendaraan">
                <form onSubmit={handleSubmit}>
                    <div className="border-4 border-purple-200 p-3 w-fit rounded-lg">
                        <p>
                            Kendaraan yang dipilih:{" "}
                            <span className="font-bold bg-slate-200 px-2 rounded-md">
                                {props?.vehicle?.name},{" "}
                                <span className="font-normal">tipe: </span>
                                {props?.vehicle?.type},{" "}
                                <span className="font-normal">plat: </span>
                                {props?.vehicle?.plate_number}
                            </span>
                        </p>
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="driver_name"
                            value="Nama Peminjam"
                            required
                        />
                        <TextInput
                            id="driver_name"
                            type="text"
                            name="driver_name"
                            value={data?.driver_name}
                            className="mt-1 block w-full"
                            autoComplete="current-driver_name"
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors?.driver_name}
                            className="mt-1"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="purpose" value="Tujuan" required />
                        <TextInput
                            id="purpose"
                            type="text"
                            name="purpose"
                            value={data?.purpose}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            autoComplete="current-purpose"
                        />
                        <InputError
                            message={errors?.purpose}
                            className="mt-1"
                        />
                    </div>
                    <div className="flex md:flex-row flex-col md:gap-3 gap-0 justify-center md:mb-4 mb-0 w-fit">
                        <div className="mt-4 w-full">
                            <InputLabel
                                htmlFor="booking_date"
                                value="Tanggal Peminjaman"
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        onChange={(date) =>
                                            setData({
                                                ...data,
                                                booking_date:
                                                    dayjs(date).format(
                                                        "YYYY-MM-DD"
                                                    ),
                                            })
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <InputError
                                message={errors?.booking_date}
                                className="mt-1"
                            />
                        </div>
                        <div className="mt-4 w-full">
                            <InputLabel
                                htmlFor="return_date"
                                value="Tanggal Pengembalian"
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        onChange={(date) =>
                                            setData({
                                                ...data,
                                                return_date:
                                                    dayjs(date).format(
                                                        "YYYY-MM-DD"
                                                    ),
                                            })
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <InputError
                                message={errors?.return_date}
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col md:gap-3 gap-0 justify-between items-end md:mb-5 mb-3">
                        <div className="md:w-60 w-full md:mt-0 mt-4">
                            <InputLabel
                                htmlFor="approved_by"
                                value="Akan disetujui oleh"
                                required
                            />
                            <FormControl
                                fullWidth
                                sx={{
                                    m: 0.5,
                                    minWidth: 120,
                                    borderRadius: "0.375rem",
                                }}
                                size="small"
                            >
                                <Select
                                    input={<OutlinedInput />}
                                    id="demo-customized-select"
                                    value={data?.approved_by}
                                    label="approved_by"
                                    name="approved_by"
                                    onChange={handleChange}
                                >
                                    {props?.users?.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <InputError
                                message={errors?.approved_by}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex justify-end mb-1 md:mt-0 mt-6">
                            <SaveButton endIcon={<BsSave />} type="submit">
                                Simpan
                            </SaveButton>
                        </div>
                    </div>
                </form>
            </Card>
        </MainLayout>
    );
}
