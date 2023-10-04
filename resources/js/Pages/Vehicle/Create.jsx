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
import TextAreaInput from "@/Components/Atoms/TextAreaInput";

export default function Create(props) { 
    const [previewImg, setPreviewImg] = useState("");
    const { data, setData, post, progress, errors } = useForm({
        name: "",
        type: "",
        image: "",
        description: "",
        plate_number: "",
        service_distance: "",
        amount: "",
    });

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("vehicle.store"), {
            preserveScroll: false,
            preserveState: false,
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
    console.log(errors);
    return (
        <MainLayout>
            <Head title="Create Vehicle" />
            <BackButton href={"/vehicle"} className="md:mb-8 mb-5" />
            <Card headerText="Tambah Kendaraan">
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Nama" required />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data?.name}
                            className="mt-1 block w-full"
                            autoComplete="current-name"
                            onChange={handleChange}
                        />
                        <InputError
                            message={props?.errors?.name}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex md:flex-row flex-col md:gap-3 gap-0 justify-center md:mb-4 mb-0">
                        <div className="mt-4 w-full">
                            <InputLabel
                                required
                                htmlFor="plate_number"
                                value="Plat Nomor"
                            />
                            <TextInput
                                id="plate_number"
                                type="text"
                                name="plate_number"
                                value={data?.plate_number}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="current-plate_number"
                            />
                            <InputError
                                message={props?.errors?.plate_number}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4 w-full">
                            <InputLabel required htmlFor="type" value="Tipe" />
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
                                    value={data?.type}
                                    label="type"
                                    name="type"
                                    onChange={handleChange}
                                >
                                    {props?.vehicle_type?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <InputError
                                message={props?.errors?.type}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {previewImg && (
                        <div className="lg:mx-32">
                            <div className="border border-purple-300 rounded-md bg-slate-300 overflow-hidden flex justify-center relative py-1 ">
                                <img
                                    src={previewImg}
                                    alt="Vehicle Image"
                                    className="object-contain  max-h-44"
                                />
                                <p className="absolute w-fit top-0 right-0 bg-indigo-400 text-white px-5 py-1 rounded-bl-md">
                                    Preview
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="flex md:flex-row flex-col md:gap-3 gap-0 justify-center">
                        <div className="flex flex-col items-center justify-center bg-grey-lighter w-full mt-4 ">
                            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-indigo-300 hover:text-white md:mt-7">
                                <svg
                                    className="w-8 h-8"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">
                                    Upload Photo
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=" image/jpeg, image/png"
                                    onChange={(e) => {
                                        setPreviewImg(
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
                                        );
                                        setData({
                                            ...data,
                                            image: e.target.files[0],
                                        });
                                    }}
                                />
                            </label>
                            <InputError
                                message={props?.errors?.image}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex flex-col md:gap-3 w-full">
                            <div className="mt-5 w-full">
                                <InputLabel
                                    required
                                    htmlFor="service_distance"
                                    value="Jarak Service (/km)"
                                />
                                <TextInput
                                    id="service_distance"
                                    type="number"
                                    name="service_distance"
                                    value={data?.service_distance}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                    autoComplete="current-service_distance"
                                />
                                <InputError
                                    message={props?.errors?.service_distance}
                                    className="mt-2"
                                />
                            </div>
                            <div className="md:mt-0 mt-4 w-full">
                                <InputLabel
                                    required
                                    htmlFor="amount"
                                    value="Jumlah Tersedia"
                                />
                                <TextInput
                                    id="amount"
                                    type="number"
                                    name="amount"
                                    value={data?.amount}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                    autoComplete="current-amount"
                                />
                                <InputError
                                    message={props?.errors?.amount}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Deskripsi" />
                        <TextAreaInput
                            id="description"
                            type="text"
                            name="description"
                            value={data?.description}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            autoComplete="current-description"
                        />
                        <InputError
                            message={props?.errors?.description}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex justify-end my-5">
                        <SaveButton endIcon={<BsSave />} type="submit">
                            Simpan
                        </SaveButton>
                    </div>
                </form>
            </Card>
        </MainLayout>
    );
}
