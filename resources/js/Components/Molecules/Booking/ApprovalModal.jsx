import React from "react";
import Modal from "../Modal";
import { LiaTimesCircleSolid } from "react-icons/lia";
import InputLabel from "@/Components/Atoms/InputLabel";
import TextInput from "@/Components/Atoms/TextInput";
import InputError from "@/Components/Atoms/InputError";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import TextAreaInput from "@/Components/Atoms/TextAreaInput";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useEffect } from "react";

export default function ApprovalModal({ show, onHide, dataEdit }) {
    const { data, setData, patch, progress, errors, reset } = useForm({
        status: "",
    });

    useEffect(() => {
        if (dataEdit?.status) {
            setData({
                ...data,
                status: dataEdit.status,
            });
        }
    }, [dataEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("approval-booking", dataEdit?.id), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
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
                reset();
                onHide();
            },
        });
    };
    return (
        <Modal show={show} maxWidth="sm">
            <div className="px-5 py-4 flex flex-row justify-between border-b-2 border-b-slate-300">
                <p className="text-lg font-bold">Persetujuan Peminjaman</p>
                <button onClick={() => onHide()}>
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <div className="px-5 py-7">
                <form action="">
                    <div className="mb-3">
                        <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                            fullWidth
                        >
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={data?.status}
                                displayEmpty
                                label="Status"
                                onChange={(e) =>
                                    setData({ status: e.target.value })
                                }
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (
                                        selected !== "approved" &&
                                        selected !== "rejected"
                                    ) {
                                        return <em>Pilih Persetujuan</em>;
                                    } else if (selected === "approved") {
                                        return "Setuju";
                                    } else if (selected === "rejected") {
                                        return "Tolak";
                                    }
                                }}
                            >
                                <MenuItem selected value="">
                                    <em className="text-red-500">None</em>
                                </MenuItem>
                                <MenuItem value="approved">Setuju</MenuItem>
                                <MenuItem value="rejected">Tolak</MenuItem>
                            </Select>
                        </FormControl>
                        <InputError message={errors?.role} className="mt-1" />
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
