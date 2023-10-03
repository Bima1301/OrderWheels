import React from "react";
import Modal from "../Modal";
import { LiaTimesCircleSolid } from "react-icons/lia";
import InputLabel from "@/Components/Atoms/InputLabel";
import TextInput from "@/Components/Atoms/TextInput";
import InputError from "@/Components/Atoms/InputError";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import TextAreaInput from "@/Components/Atoms/TextAreaInput";

export default function ReturnModal({ show, onHide, dataEdit }) {
    const { data, setData, post, progress, errors } = useForm({
        _method: "patch",
        distance: "",
        liters: "",
        cost_per_liter: "",
        description: "",
    });

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("update-booking", dataEdit?.id), {
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
                toast.success("Berhasil melakukan pengembalian!");
            },
        });
    };
    return (
        <Modal show={show}>
            <div className="px-5 py-4 flex flex-row justify-between border-b-2 border-b-slate-300">
                <p className="text-lg font-bold">Pengembalian Kendaraan</p>
                <button onClick={() => onHide()}>
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <div className="px-5 py-7">
                <form action="">
                    <div className="border-4 border-purple-200 p-3 w-full rounded-lg mb-5 flex flex-col">
                        <p className="mb-2">
                            Nama Pengendara:{" "}
                            <span className="font-bold bg-slate-200 px-2 rounded-md">
                                {dataEdit?.driver_name}
                            </span>
                        </p>
                        <p>
                            Kendaraan yang dipilih:{" "}
                            <span className="font-bold bg-slate-200 px-2 rounded-md">
                                {dataEdit?.vehicle?.name},{" "}
                                <span className="font-normal">tipe: </span>
                                {dataEdit?.vehicle?.type},{" "}
                                <span className="font-normal">plat: </span>
                                {dataEdit?.vehicle?.plate_number}
                            </span>
                        </p>
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="distance"
                            value="Jarak Tempuh (Km)"
                            required
                        />
                        <TextInput
                            id="distance"
                            type="number"
                            name="distance"
                            value={data?.distance}
                            className="mt-1 block w-full"
                            autoComplete="current-distance"
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors?.distance}
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="liters"
                            value="Total Bahan Bakar (L)"
                            required
                        />
                        <TextInput
                            id="liters"
                            type="number"
                            name="liters"
                            value={data?.liters}
                            className="mt-1 block w-full"
                            autoComplete="current-liters"
                            onChange={handleChange}
                        />
                        <InputError message={errors?.liters} className="mt-1" />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="cost_per_liter"
                            value="Biaya Bahan Bakar (/L)"
                            required
                        />
                        <TextInput
                            id="cost_per_liter"
                            type="number"
                            name="cost_per_liter"
                            value={data?.cost_per_liter}
                            className="mt-1 block w-full"
                            autoComplete="current-cost_per_liter"
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors?.cost_per_liter}
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            htmlFor="description"
                            value="Deskripsi Pengembalian"
                        />
                        <TextAreaInput
                            rows={2}
                            id="description"
                            type="number"
                            name="description"
                            value={data?.description}
                            className="mt-1 block w-full"
                            autoComplete="current-description"
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors?.description}
                            className="mt-1"
                        />
                    </div>
                </form>
            </div>
            <div className="px-5 py-4 flex flex-row justify-end border-t-2 border-t-slate-300">
                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 px-8 py-3 rounded-md text-white font-bold inline-flex items-center gap-2 hover:bg-purple-500"
                >
                    Simpan
                </button>
            </div>
        </Modal>
    );
}
