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

export default function Update(props) {
    const { data, setData, post, progress, errors } = useForm({
        distance: "",
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
            <Head title="Booking Done" />
            <Card headerText="Pengembalian Kendaraan">INi kembali</Card>
        </MainLayout>
    );
}
